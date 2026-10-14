import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const controlador = new AbortController();

    async function obtenerProducto() {
      try {
        setCargando(true);
        setError("");
        setProducto(null);

        const respuesta = await fetch(
          `http://localhost:9191/tienda-api/api/producto.php?id=${encodeURIComponent(id)}`,
          { signal: controlador.signal },
        );

        const data = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(data.error || "No fue posible obtener el producto.");
        }

        setProducto(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(error);
        setError(error.message || "Error al consultar el producto.");
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    obtenerProducto();

    return () => controlador.abort();
  }, [id]);

  if (cargando) {
    return (
      <div className="container py-5">
        <p>Cargando información del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Producto no encontrado.</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1>{producto.nombre}</h1>

          <h2 className="text-primary my-3">
            $
            {Number(producto.precio).toLocaleString("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>

          <p>{producto.descripcion}</p>

          <p>
            <strong>Stock:</strong> {producto.stock}
          </p>

          <button
            className="btn btn-primary btn-lg"
            disabled={Number(producto.stock) <= 0}
            onClick={() => {
              const resultado = agregarAlCarrito(producto);
              setMensajeCarrito(resultado.mensaje);
            }}
          >
            <i className="bi bi-cart"></i>{" "}
            {Number(producto.stock) > 0 ? "Agregar al carrito" : "Agotado"}
          </button>
          {mensajeCarrito && (
            <div className="alert alert-info mt-3" role="status">
              {mensajeCarrito}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;

/* import { useParams } from "react-router-dom";
import { productos } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";

function DetalleProducto() {
  const { id } = useParams();

  const { agregarAlCarrito } = useCarrito();

  const producto = productos.find((item) => item.id === Number(id));

  if (!producto) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Producto no encontrado.</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h1>{producto.nombre}</h1>

          <h2 className="text-primary my-3">${producto.precio}</h2>

          <p>{producto.descripcion}</p>

          <p>
            <strong>Stock:</strong> {producto.stock}
          </p>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => agregarAlCarrito(producto)}
          >
            <i className="bi bi-cart"></i> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
 */
