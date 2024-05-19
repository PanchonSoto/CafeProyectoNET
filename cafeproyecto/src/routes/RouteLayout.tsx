import { useLocation, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Landing, Login, Register, Home } from "../pages";
import '../App.css';


export const Layout = () => {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/register'];

    return (
        <>
            {/* oculta navbar en login y register */}
            {!hideNavbarPaths.includes(location.pathname) && <Navbar username="Pancho" />}
            
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            
        </>
    );
};