import { Flex, Card, Heading, Box, TextField, Button, Text, Link } from "@radix-ui/themes";

import '../../styles/login-theme.css';


export const Login = () => {
  return (
    <div className="container">
      <Flex className="flex" justify={'center'} flexShrink="0" gap="6" direction="column" width="416px" mx={'auto'}>
        <Card size="4" className="card">
          <Heading as="h3" size="6" trim="start" mb="5">
            Iniciar sesión
          </Heading>

          <Box mb="5">
            <Flex mb="1">
              <Text as="label" htmlFor="example-email-field" size="2" weight="bold">
                Correo electrónico:
              </Text>
            </Flex>
            <TextField.Root
              placeholder="Ingresa tu correo"
              id="example-email-field"
            />
          </Box>

          <Box mb="5" position="relative">
            <Flex align="baseline" justify="between" mb="1">
              <Text as="label" size="2" weight="bold" htmlFor="example-password-field">
                Contraseña:
              </Text>
            </Flex>
            <TextField.Root
              placeholder="Ingresa contraseña"
              id="example-password-field"
            />
          </Box>

          <Flex mt="4" justify="center" gap="3">
            <Button variant="outline" style={{width:'100%'}}>
              Iniciar
            </Button>
          </Flex>
          <Flex mt="6" justify="center" gap="3">
            <Button variant="outline" style={{width:'100%'}}>
              Registrarse
            </Button>
          </Flex>
        </Card>
      </Flex>  
    </div>
  )
}
