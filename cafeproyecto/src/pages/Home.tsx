import React, { useState } from "react";
import { Box, Card, Flex, Heading, Separator } from '@radix-ui/themes';
import { Productcard } from "../components/ProductCard";
import useFetchProducts from "../hooks/fetchProducts";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import '../App.css';
import '../assets/radixStyles.css';


export const Home = ({...props }) => {
    const [refresh, setRefresh] = useState(false);
    const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
    const { products, loading, error } = useFetchProducts('http://localhost:5084/api/Productos',refresh);

    const handleProductUpdated = () => {
      setRefresh(!refresh);
    };
    
    if (loading) {
      return <div style={{ height: '100vh', overflow: 'hidden'}} className="main-content">Loading...</div>;
    }
    
    if (error) {
      return <div style={{ height: '100vh', overflow: 'hidden'}} className="main-content">Error: {error.message}</div>;
    }

    return (
        <div style={{ height: '100vh', overflow: 'hidden'}} className="main-content">

          <ScrollArea.Root className="scroll-area-root">

            <ScrollArea.Viewport className="scroll-area-viewport">
            <Flex direction="row" gap="4" justify={"start"} pl={"9"} pt={"2"} >
                <Heading style={{ color: '#e3e3e3' }}>Productos</Heading>
            </Flex>
              <Box pb={"4"} mb={"3"}>
                  <Separator  size="4" style={{height:"1px"}}/>
              </Box>
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
                    key={product.productoId}
                    productoId={product.productoId}
                    nombre={product.nombre}
                    descripcion={product.descripcion}
                    precio={product.precio}
                    disponible={product.disponible}
                    imagenUrl={product.imagenUrl}
                    fechaCreacion={product.fechaCreacion}
                    onProductUpdated={handleProductUpdated}
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
