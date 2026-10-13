import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCarrito } from "../context/CarritoContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    async function obtenerProductos() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(
          "http://localhost:9191/tienda-api/api/productos.php",
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los productos.");
        }

        const data = await respuesta.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta de la API no es válida.");
        }

        setProductos(data);
      } catch (error) {
        console.error(error);
        setError("No fue posible cargar los productos. Intenta nuevamente.");
      } finally {
        setCargando(false);
      }
    }

    obtenerProductos();
  }, []);

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>

        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Productos</h1>

      {productos.length === 0 ? (
        <div className="alert alert-info">No hay productos disponibles.</div>
      ) : (
        <div className="row">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Productos;
