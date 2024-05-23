import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/fetchLogin';


interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PublicRoute;