import React from 'react';

import { ExitIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import '../assets/radixStyles.css';
import useAuth from '../hooks/fetchLogin';
import { Button } from '@radix-ui/themes';


interface NavbarProps {
  username: string;
}

export const Navbar: React.FC<NavbarProps> = ({ username }) => {

  const { logout, user } = useAuth();

  const handleSubmit = async (event:React.FormEvent) => {
  event.preventDefault();
  try {
    logout();
  } catch (err) {
    throw err;
  }
};

  return (
    <NavigationMenu.Root className="navbar">
      <NavigationMenu.List className="navbar-list">
        <NavigationMenu.Item className="navbar-item">
          <Link to="/home">Productos</Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="navbar-item">
          <Link to="/history">Mis compras</Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className="navbar-item">
          <Link to="/top">Productos mas vendidos</Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <div className="navbar-username">
        { user?.nombre || username }
        <div className='nameDivider'></div>
        <Button variant="ghost" onClick={handleSubmit}>
          <ExitIcon color='red' />
        </Button>
        
      </div>
    </NavigationMenu.Root>
  );
}
