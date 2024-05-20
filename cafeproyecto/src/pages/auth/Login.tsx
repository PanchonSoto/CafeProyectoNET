import React, { useState } from 'react';
import { Flex, Card, Heading, Box, TextField, Button, Text, Link } from "@radix-ui/themes";
import useAuth from '../../hooks/fetchLogin';

import '../../styles/login-theme.css';


export const Login = () => {

  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target?.value);
  };

  const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event:React.FormEvent) => {
    console.log('event3:=> ',event);
    event.preventDefault();
    try {
      console.log(email, password );
      await login({ email, password });
    } catch (err) {
      setError('Correo electrónico o contraseña inválidos');
    }
  };

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
              value={email}
              onChange={handleEmailChange}
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
              type='password'
              id="example-password-field"
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>

          {error && <Text color="red">{error}</Text>}

          <Flex mt="4" justify="center" gap="3">
            <Button variant="outline" style={{width:'100%'}} onClick={handleSubmit}>
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
