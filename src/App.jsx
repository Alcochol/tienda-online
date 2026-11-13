import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DetalleProducto from "./pages/DetalleProducto";
import Checkout from "./pages/Checkout";
import MisPedidos from "./pages/MisPedidos";

import RutaProtegida from "./components/RutaProtegida";

import AdminLayout from "./admin/layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const esAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!esAdmin && <Navbar />}

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Páginas de clientes autenticados */}
        <Route element={<RutaProtegida />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
        </Route>

        {/* Panel exclusivo del administrador */}
        <Route element={<RutaProtegida rolesPermitidos={["administrador"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
