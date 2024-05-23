import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Card, Heading, Flex, Box, TextField, Select, Separator, Link, Text, Avatar } from '@radix-ui/themes'
import React from 'react'

import useFetchSellerProducts from "../hooks/useSellerProducts";

export const TopSellers = () => {

    const { loading, error, products } = useFetchSellerProducts('http://localhost:5084/api/Productos/seller-products', false);

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className="main-content">
            <Flex direction="row" gap="4" justify={"start"} pl={"9"} pt={"2"} style={{ paddingTop: 38 }}>
                <Heading style={{ color: '#e3e3e3' }}>Productos mas vendidos</Heading>
            </Flex>
            <Box pb={"4"} mb={"3"}>
                <Separator size="4" style={{ height: "1px" }} />
            </Box>
            <Card size="2" style={{ width: "85%", margin: "auto" }}>
                <Heading as="h3" size="4" mb="4">
                    Lista de los mas vendidos
                </Heading>

                <Flex direction="column" gap="5" mb="2">
                    {products.map((sellerP) => (
                        <Flex justify="between" key={sellerP.productoId}>
                            <Avatar
                                size="3"
                                src={sellerP.imagenUrl}
                                fallback='pizza pizza'
                                mr={"3"}
                            />
                            <Box>
                                <Link
                                    href="#"
                                    tabIndex={3}
                                    size="3"
                                    weight="bold"
                                    highContrast
                                    underline="hover"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    {sellerP.nombre}
                                </Link>
                                <Text as="div" size="2" mb="2">
                                    Customer since {sellerP.descripcion}
                                </Text>
                                {/* <Text as="div" size="1" mb="1" color="gray">
                                    <address style={{ all: 'unset' }}>{customer.address}</address>
                                </Text> */}
                            </Box>

                            <Flex align="center" justify="end" gap="5" flexGrow="1">
                                <Box>
                                    <Text as="div" size="2" color="gray" align="right">
                                        Ganancias
                                    </Text>
                                    <Text as="div" size="6" weight="bold" align="right">
                                        ${sellerP.totalGenerado}
                                    </Text>
                                </Box>
                                <Separator orientation="vertical" size="3" />
                                <Box minWidth="70px">
                                    <Text as="div" size="2" color="gray">
                                        Ordenes
                                    </Text>
                                    <Text as="div" size="6" weight="bold">
                                        {sellerP.ventas}
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Card>
        </div>
    )
}
