import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../interfaces/UserInterface';

const useAuth = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials: { email: string, password: string }) => {
    try {
      const body = { "email": credentials.email, "contraseña": credentials.password }
      console.log(credentials);
      const response = await fetch('http://localhost:5084/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (credentials: User) => {
    try {
      const body = {
        "email": credentials.email,
        "contraseña": credentials.password,
        "nombre": credentials.nombre,
        "apellido": credentials.apellido
      }
      console.log(credentials);
      const response = await fetch('http://localhost:5084/api/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Register failed');
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error al crear user:', error.message);
      } else {
        console.error('Error desconocido al crear user:', error);
      }
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');

    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // Sincroniza estado y localStorage si el estado cambia
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return {
    user,
    login,
    register,
    logout,
  };
};

export default useAuth;