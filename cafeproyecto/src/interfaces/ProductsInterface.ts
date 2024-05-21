export interface Product {
    productoId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
    fechaCreacion: string;
    imagenUrl: string;
  }
  
export interface UseFetchProductsResult {
    products: Product[];
    loading: boolean;
    error: Error | null;
  }