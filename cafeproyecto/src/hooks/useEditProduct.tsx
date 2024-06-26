import { useNavigate } from 'react-router-dom';
import { Product } from '../interfaces/ProductsInterface';

const useEditProduct = () => {
  const navigate = useNavigate();

  const editProduct = async (producto: Product) => {
    try {
      console.log(producto);
      const response = await fetch(`http://localhost:5084/api/Productos/${producto.productoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Error al editar el producto');
      }

      const responseText = await response.text();
      if (responseText) {
        const updatedProduct = JSON.parse(responseText);
        console.log(updatedProduct);
      } else {
        console.log('No content returned from server');
      }

      navigate('/');
    } catch (error) {
      console.error('updateProduct error:', error);
    }
  };

  const createProduct = async (producto: Product) => {
    try {
      const response = await fetch(`http://localhost:5084/api/Productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Error al editar el producto');
      }

      const responseText = await response.text();
      if (responseText) {
        const updatedProduct = JSON.parse(responseText);
        console.log(updatedProduct);
      } else {
        console.log('No content returned from server');
      }

      navigate('/');
    } catch (error) {
      console.error('updateProduct error:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5084/api/Productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Error al borrar el producto');
      }

      const responseText = await response.text();
      if (responseText) {
        const updatedProduct = JSON.parse(responseText);
        console.log(updatedProduct);
      } else {
        console.log('No content returned from server');
      }

      navigate('/');
    } catch (error) {
      console.error('deleteProduct error:', error);
    }
  };

  return { editProduct, createProduct, deleteProduct };
};

export default useEditProduct;
