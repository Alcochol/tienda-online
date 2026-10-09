import { useParams } from "react-router-dom";
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
