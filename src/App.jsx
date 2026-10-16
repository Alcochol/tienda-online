import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import DetalleProducto from "./pages/DetalleProducto";
import Checkout from "./pages/Checkout";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
