import { useState, useEffect } from 'react';

interface Product {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  fechaCreacion: string;
  imagenUrl: string;
}

interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

const useFetchProducts = (url: string): UseFetchProductsResult => {
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
  }, [url]);

  return { products, loading, error };
};

export default useFetchProducts;