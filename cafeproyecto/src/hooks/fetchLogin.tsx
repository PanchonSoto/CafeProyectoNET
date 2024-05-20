import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(() => {
    
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials:{email:string, password:string}) => {
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
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
    logout,
  };
};

export default useAuth;