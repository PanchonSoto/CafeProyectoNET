import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme } from '@radix-ui/themes';
import { Home, Landing, Login, Register } from './pages/index';
import '@radix-ui/themes/styles.css';
import { Navbar } from "./components/Navbar";

import './App.css';

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <Navbar username="Pancho"/> {/* Renderiza tu barra de navegación aquí */}
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<h1>Home</h1>} />
                        <Route path="/landing" element={<Landing />} />
                        {/* Las rutas de login y registro no incluyen la barra de navegación */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Otras rutas con la barra de navegación */}
                        <Route path="/home" element={<Home />} />
                        {/* Otras rutas con la barra de navegación */}
                    </Routes>
                </div>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
