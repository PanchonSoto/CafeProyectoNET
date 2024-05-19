import React from "react";
import { Box, Card, Flex, Heading, Separator } from '@radix-ui/themes';
import { Productcard } from "../components/ProductCard";
import useFetchProducts from "../hooks/fetchProducts";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import '../App.css'


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
        <div style={{ height: '100vh', overflow: 'hidden'}}> {/* Envuelve el contenedor principal para evitar el scroll de toda la página */}

          <ScrollArea.Root className="scroll-area-root">
            <Flex direction="row" gap="4" justify={"start"} pl={"9"} pt={"6"} pb={"3"}>
                <Heading>Productos</Heading>
            </Flex>
            <Box>
                <Separator size="4" style={{height:"3px"}}/>
            </Box>
            <ScrollArea.Viewport className="scroll-area-viewport">
              <Flex 
                align="center" 
                justify="center" 
                gap="2" 
                ref={setPortalContainer} 
                direction="row" 
                wrap="wrap"
                style={{marginBottom:220}} 
                {...props}
              >
                {products.map(product => (
                  <Productcard 
                    key={product.productoId} // Asegúrate de agregar una key única
                    productoId={product.productoId}
                    nombre={product.nombre}
                    descripcion={product.descripcion}
                    precio={product.precio}
                    disponible={product.disponible}
                    imagenUrl={product.imagenUrl}
                    fechaCreacion={product.fechaCreacion}
                  />
                ))}
              </Flex>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical" className="scroll-area-scrollbar">
              <ScrollArea.Thumb className="scroll-area-thumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar orientation="horizontal" className="scroll-area-scrollbar">
              <ScrollArea.Thumb className="scroll-area-thumb" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className="scroll-area-corner" />
          </ScrollArea.Root>
        </div>
      );

    //   return (
    //     <>
    //     <Flex direction="row" gap="4" justify={"start"} pl={"9"} pt={"6"}>
    //         <Heading>Productos</Heading>
    //     </Flex>
    //         <Flex 
    //          align="center" justify="center" gap="2" 
    //          ref={setPortalContainer} direction="row" wrap="wrap" {...props}
    //          style={{paddingTop: 30, paddingBottom:100}}>
    //             { products.map(product =>( 
                    
    //                 <Productcard 
    //                     key={product.productoId}
    //                     productoId={product.productoId}
    //                     nombre={product.nombre}
    //                     descripcion={product.descripcion}
    //                     precio={product.precio}
    //                     disponible={product.disponible}
    //                     imagenUrl={product.imagenUrl}
    //                     fechaCreacion={product.fechaCreacion}
    //                 />
                                
    //                     )
    //                 ) 
    //             }
    //         </Flex>
    //     </>
    // )
}
