import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Card, Heading, Box, TextField, Button, Text, Link } from "@radix-ui/themes";
import useAuth from '../../hooks/fetchLogin';

import '../../styles/login-theme.css';


export const Register = () => {

  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target?.value);
  };

  const handleLastNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

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
      await register({ email, password, nombre:name, apellido:lastName });
    } catch (err) {
      console.log(err);
      setError(JSON.stringify(err));
    }
  };

  return (
    <div className="container">
      <Flex className="flex" justify={'center'} flexShrink="0" gap="6" direction="column" 
      width="416px" mx={'auto'}>
        <Card size="4" className="card">
          <Heading as="h3" size="6" trim="start" mb="5">
            Registro
          </Heading>

          <Box mb="2">
            <Flex mb="1">
              <Text as="label" htmlFor="example-email-field" size="2" weight="bold">
                Nombre
              </Text>
            </Flex>
            <TextField.Root
              placeholder="Ingresa tu nombre"
              id="example-name-field"
              value={name}
              onChange={handleNameChange}
            />
          </Box>

          <Box mb="5">
            <Flex mb="1">
              <Text as="label" htmlFor="example-email-field" size="2" weight="bold">
                Apellido
              </Text>
            </Flex>
            <TextField.Root
              placeholder="Ingresa tu apellido"
              id="example-lastName-field"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </Box>

          <Box mb="2">
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
              Registrarse
            </Button>
          </Flex>
          <Flex mt="6" justify="center" gap="3">
            <Link href="#" size="2" onClick={(e) => navigate("/login")}>
              Regresar
            </Link>
          </Flex>
        </Card>
      </Flex>  
    </div>
  )
}

