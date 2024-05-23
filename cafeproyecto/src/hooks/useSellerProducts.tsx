import { useState, useEffect } from 'react';
import { UseGetSellerProducts, SellerProducts } from '../interfaces/ProductsInterface';



const useFetchSellerProducts = (url: string, refresh: boolean): UseGetSellerProducts => {
  const [products, setProducts] = useState<SellerProducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: SellerProducts[] = await response.json();
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

export default useFetchSellerProducts;