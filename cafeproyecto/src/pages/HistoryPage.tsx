import { Card, Heading, Flex, Avatar, Box, Separator, Text, Link } from '@radix-ui/themes';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import '../App.css';
import '../assets/radixStyles.css';

import useAuth from '../hooks/fetchLogin';
import useFetchUserOrders from '../hooks/useUserOrders';




export const History = () => {

    const { user } = useAuth();
    const { orders, loading, error } = useFetchUserOrders(user?.userId);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, hh:mm a", { locale: es });
    };

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className="main-content">
            <Flex direction="row" gap="4" justify={"start"} pl={"9"} pt={"2"} style={{ paddingTop: 38 }}>
                <Heading style={{ color: '#e3e3e3' }}>Historial</Heading>
            </Flex>
            <Box pb={"4"} mb={"3"}>
                <Separator size="4" style={{ height: "1px" }} />
            </Box>
            <Card size="4" style={{ width: '85%', margin: 'auto' }}>
                <Heading as="h3" size="6" trim="start" mb="2">
                    Compras recientes
                </Heading>


                <Text as="p" size="2" mb="7" color="gray">
                    Revisa lo que has comprado estos ultimos dias.
                </Text>

                <Flex direction={"column"} mb={"4"}>
                    <h2>No hay registros de compras.</h2>
                </Flex>

                {orders.map(order => (
                    <Flex direction="column" key={order.ordenId}>
                        <Flex direction="column" gap="3" mb="5">
                            <Flex justify="between" align="center">
                                <Flex gap="3" align="center">
                                    <Avatar
                                        size="3"
                                        src={order?.imagenUrl}
                                        fallback={order?.nombreProducto.toUpperCase()}
                                    />
                                    <Box>
                                        <Text as="div" size="2" weight="bold">
                                            {order?.nombreProducto}
                                        </Text>
                                        <Text as="div" size="2" color="gray">
                                            Total{' '}
                                            <Link href="#" onClick={(e) => e.preventDefault()}>
                                                ${order?.precio}
                                            </Link>
                                        </Text>
                                    </Box>
                                </Flex>

                                <Text size="2" color="gray">
                                    {order ? formatDate(order.fechaOrden) : 'Cargando...'}
                                </Text>
                            </Flex>
                        </Flex>
                        <Box mb={"4"}>
                            <Separator size="4" />
                        </Box>


                    </Flex>
                ))}

            </Card>

        </div>
    )
}