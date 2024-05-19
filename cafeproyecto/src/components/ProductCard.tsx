import React from 'react';
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    IconButton,
    Link,
    Select,
    Separator,
    Text,
    Theme,
} from '@radix-ui/themes';
import {
    BookmarkFilledIcon,
    BookmarkIcon,
} from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';


interface ProductCardProps {
    productoId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
    fechaCreacion: string;
    imagenUrl: string;
    fechaCreacionn?: Date; // Puedes usar Date o string dependiendo de tu necesidad
    focusable?: boolean; // Esto es opcional con un valor por defecto
}

export const Productcard: React.FC<ProductCardProps> = ({
    productoId,
    nombre,
    descripcion,
    precio,
    disponible,
    fechaCreacion,
    imagenUrl,
    focusable = true,
    ...props
}) => {

    const tabIndex = focusable ? undefined : -1;
    const [state, setState] = React.useState({
        sneakersBookmarked: false,
        jeansBookmarked: false,
        delivery: '',
        size: '9',
        material: '',
        color: '',
        productMaterial: '',
        productColor: '',
        productSizes: [],
    });
  return (
    <Flex flexShrink="0" gap="2" direction="row" width="304px">
        <Card size="1">
            <Flex mb="2" position="relative">
                <img
                    title="product"
                    width="280"
                    height="270"
                    src={imagenUrl}
                    style={{ borderRadius: 'var(--radius-1)' }}
                />

                <Theme appearance="light" asChild>
                    <Flex
                        align="center"
                        justify="center"
                        position="absolute"
                        bottom="0"
                        right="0"
                        width="32px"
                        height="32px"
                        style={{ borderRadius: 'var(--radius-3)' }}
                        m="2"
                    >
                        <IconButton
                            size="2"
                            tabIndex={tabIndex}
                            color="gray"
                            variant="ghost"
                            highContrast={state.sneakersBookmarked}
                            onClick={() =>
                                setState((currentState) => ({
                                    ...currentState,
                                    sneakersBookmarked: !currentState.sneakersBookmarked,
                                }))
                            }
                        >
                            {state.sneakersBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                        </IconButton>
                    </Flex>
                </Theme>
            </Flex>

            <Flex align="end" justify="between" mb="2">
                <Box>
                    <Flex mb="1">
                        <Link
                            href="#"
                            underline="hover"
                            size="2"
                            color="gray"
                            highContrast
                            tabIndex={tabIndex}
                            onClick={(e) => e.preventDefault()}
                        >
                            Bebida
                        </Link>
                    </Flex>

                    <Heading as="h3" size="3">
                        { nombre }
                    </Heading>
                </Box>

                <Text size="6" weight="bold">
                    ${ precio }
                </Text>
            </Flex>

            <Text as="p" size="2" color="gray" mb="4">
                { descripcion }
            </Text>

            <Box>
                <Separator size="4" my="4" />
            </Box>

            

            <Flex gap="2" align="end">
                {/* <Flex direction="column" flexGrow="1">
                    <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                        Editar
                    </Button>
                </Flex>

                <Flex direction="column" minWidth="80px">
                    <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                            Editar
                    </Button>
                </Flex> */}

                <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                    Comprar
                </Button>
            </Flex>
        </Card>
    </Flex>

  );
}
