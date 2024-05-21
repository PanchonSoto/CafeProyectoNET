import { useEffect, useState } from "react";
import { UserOrders } from "../interfaces/OrderInterface";


interface UseFetchOrdersResult {
    orders: UserOrders[];
    loading: boolean;
    error: Error | null;
  }

const useFetchUserOrders = (usuarioId: string): UseFetchOrdersResult => {
    const [orders, setOrders] = useState<UserOrders[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5084/api/Order/user/${usuarioId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data: UserOrders[] = await response.json();
          setOrders(data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [usuarioId]);
  
    return { orders, loading, error };
  };
  
  export default useFetchUserOrders;