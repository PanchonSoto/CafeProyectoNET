import React, { useRef, useState } from "react";

import { Box, Button, Flex, Heading, Separator } from '@radix-ui/themes';
import { PlusIcon } from "@radix-ui/react-icons";
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { Productcard } from "../components/ProductCard";
import useFetchProducts from "../hooks/fetchProducts";

import '../App.css';
import '../assets/radixStyles.css';
import EditProductDialog from "../components/dialogs/EditProduct";
import useAuth from "../hooks/fetchLogin";


export const Home = ({ ...props }) => {

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();

  const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);
  const { products, loading, error } = useFetchProducts('http://localhost:5084/api/Productos', refresh);

  const handleProductUpdated = () => {
    setRefresh(!refresh);
  };

  if (loading) {
    return <div style={{ height: '100vh', overflow: 'hidden' }} className="main-content">Loading...</div>;
  }

  if (error) {
    return <div style={{ height: '100vh', overflow: 'hidden' }} className="main-content">Error: {error.message}</div>;
  }

  const openDialog = () => {
    if (triggerRef.current) {
      triggerRef.current.click();
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }} className="main-content">

      <ScrollArea.Root className="scroll-area-root">

        <ScrollArea.Viewport className="scroll-area-viewport">
          <Flex direction="row" gap="4" justify={"between"} pl={"9"} pt={"2"}>
            <Heading style={{ color: '#e3e3e3' }}>Productos</Heading>
            <div className={`${user?.rol !== 'admin' ? 'noShow' : ''}`}>
            <EditProductDialog
              triggerRef={triggerRef}
              onProductUpdated={handleProductUpdated}
              btnTitle="create"
            />
            </div>
          </Flex>
          <Box pb={"4"} mb={"3"}>
            <Separator size="4" style={{ height: "1px" }} />
          </Box>
          <Flex
            align="center"
            justify="center"
            gap="2"
            ref={setPortalContainer}
            direction="row"
            wrap="wrap"
            style={{ marginBottom: 220 }}
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
}
