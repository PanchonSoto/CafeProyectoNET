import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { History, Login, Register, Home } from "../pages";
import '../App.css';
import useAuth from "../hooks/fetchLogin";
import ProtectedRoute  from "../components/guard/ProtectedRoute";
// import NotFound from "../components/NotFound";
import PublicRoute from "../components/guard/PublicRoutes";
import { TopSellers } from "../pages/TopSellers";


export const Layout = () => {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/register'];

    const { user } = useAuth();

    return (
        <>
            {!hideNavbarPaths.includes(location.pathname) && <Navbar username={user?.nombre || null} />}
            
            <Routes>
                <Route
                 path="/login"
                 element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                    }
                />
                <Route
                 path="/register"
                 element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/top"
                    element={
                        <ProtectedRoute>
                            <TopSellers />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
        </>
    );
};