import { useCarrito } from "../context/CarritoContext";

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
