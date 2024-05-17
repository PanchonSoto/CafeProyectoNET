import React from "react";
import { Flex } from '@radix-ui/themes';
import { Productcard } from "../components/ProductCard";
import useFetchProducts from "../hooks/fetchProducts";




export const Home = ({...props }) => {

    const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
    const { products, loading, error } = useFetchProducts('http://localhost:5084/api/Productos');

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

      return (
        <>
            <Flex align="center" justify="center" gap="2" ref={setPortalContainer} direction="row" wrap="wrap" {...props}>
                { products.map(product =>( 
                    
                    <Productcard 
                        productoId={product.productoId}
                        nombre={product.nombre}
                        descripcion={product.descripcion}
                        precio={product.precio}
                        disponible={product.disponible}
                        imagenUrl={product.imagenUrl}
                        fechaCreacion={product.fechaCreacion}
                    />
                                
                        )
                    ) 
                }
            </Flex>
        </>
    )
}
