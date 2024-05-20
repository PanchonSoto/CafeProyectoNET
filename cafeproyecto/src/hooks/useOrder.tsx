import { useState } from 'react';
import { CreateOrder } from '../interfaces/OrderInterface';

const useOrder = () => {
  const [order, setOrder] = useState(null);
  const [orderError, setError] = useState<string | null>(null);

  const createOrder = async (orderData: CreateOrder) => {
    try {
      const response = await fetch('http://localhost:5084/api/Order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || 'Error al crear la orden');
      }

      const createdOrder = await response.json();
      setOrder(createdOrder);
      
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error al crear la orden:', error.message);
            setError(error.message);
        } else {
            console.error('Error desconocido al crear la orden:', error);
            setError('Error al crear la orden.');
        }
    }
  };

  return {
    order,
    orderError,
    createOrder,
  };
};

export default useOrder;