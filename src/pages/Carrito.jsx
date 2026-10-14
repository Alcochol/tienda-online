import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Carrito() {
  const { carrito, cambiarCantidad, eliminarDelCarrito, totalCompra } =
    useCarrito();

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <h1>Mi carrito</h1>

        <div className="alert alert-info mt-4">Tu carrito está vacío.</div>

        <Link to="/productos" className="btn btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Mi carrito</h1>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th style={{ width: "130px" }}>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>

                <td>
                  $
                  {Number(item.precio).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max={Number(item.stock)}
                    value={item.cantidad}
                    onChange={(e) => {
                      cambiarCantidad(item.id, e.target.value);
                    }}
                  />
                </td>

                <td>
                  $
                  {(Number(item.precio) * item.cantidad).toLocaleString(
                    "es-MX",
                    {
                      minimumFractionDigits: 2,
                    },
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-4">
        <h3>
          Total: $
          {totalCompra.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
          })}
        </h3>

        <Link to="/productos" className="btn btn-outline-secondary me-2">
          Seguir comprando
        </Link>

        <button
          className="btn btn-success"
          onClick={() =>
            alert("En la siguiente etapa construiremos el proceso de compra.")
          }
        >
          Continuar compra
        </button>
      </div>
    </div>
  );
}

export default Carrito;

/* import { useCarrito } from "../context/CarritoContext";

function Carrito() {
  const { carrito, cantidadTotal } = useCarrito();

  return (
    <div className="container py-5">
      <h1>Mi carrito</h1>

      <p>Productos: {cantidadTotal}</p>

      {carrito.length === 0 ? (
        <div className="alert alert-info">Tu carrito está vacío.</div>
      ) : (
        carrito.map((producto) => (
          <div className="card mb-3" key={producto.id}>
            <div className="card-body">
              <h5>{producto.nombre}</h5>

              <p>Precio: ${producto.precio}</p>

              <p>Cantidad: {producto.cantidad}</p>

              <p>Subtotal: ${producto.precio * producto.cantidad}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Carrito;
 */
