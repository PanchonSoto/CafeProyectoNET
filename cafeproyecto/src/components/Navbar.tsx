import React from 'react';
import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import '../assets/radixStyles.css';


interface NavbarProps {
  username: string;
}

export const Navbar: React.FC<NavbarProps> = ({ username }) => {
    return (
        <NavigationMenu.Root className="navbar">
          <NavigationMenu.List className="navbar-list">
            <NavigationMenu.Item className="navbar-item">
              <Link to="/home">Productos</Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="navbar-item">
              <Link to="/landing">Mis ordenes</Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item className="navbar-item">
              <Link to="">Admin</Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <div className="navbar-username">
            {username}
          </div>
        </NavigationMenu.Root>
      );
}
