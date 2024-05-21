import { useState, useEffect } from 'react';
import { UseFetchProductsResult, Product } from '../interfaces/ProductsInterface';



const useFetchProducts = (url: string, refresh: boolean): UseFetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url, refresh]);

  return { products, loading, error };
};

export default useFetchProducts;