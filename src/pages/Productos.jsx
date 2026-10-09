import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCarrito } from "../context/CarritoContext";

function Productos() {
  const [productos, setProductos] = useState([]);

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch("http://localhost:5173/tienda-api/api/productos.php")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Productos</h1>

      <div className="row">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
}

export default Productos;
