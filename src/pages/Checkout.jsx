import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Checkout() {
  const { carrito, totalCompra, vaciarCarrito } = useCarrito();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [pedido, setPedido] = useState(null);

  async function procesarCompra(evento) {
    evento.preventDefault();

    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost:9191/tienda-api/api/crear_pedido.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            email,
            telefono,
            direccion,
            items: carrito.map((item) => ({
              id: Number(item.id),
              cantidad: Number(item.cantidad),
            })),
          }),
        },
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "No fue posible registrar el pedido.");
      }

      setPedido(data);
      vaciarCarrito();
    } catch (error) {
      console.error(error);
      setError(error.message || "Ocurrió un error al procesar la compra.");
    } finally {
      setCargando(false);
    }
  }

  if (pedido) {
    return (
      <div className="container py-5">
        <div className="alert alert-success">
          <h2>¡Pedido registrado!</h2>

          <p>{pedido.mensaje}</p>

          <p>
            Número de pedido: <strong>{pedido.pedido_id}</strong>
          </p>

          <p>
            Total:{" "}
            <strong>
              $
              {Number(pedido.total).toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </strong>
          </p>
        </div>

        <Link to="/productos" className="btn btn-primary">
          Seguir comprando
        </Link>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <h1>Finalizar compra</h1>

        <div className="alert alert-info mt-4">Tu carrito está vacío.</div>

        <Link to="/productos" className="btn btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Finalizar compra</h1>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h4 className="mb-3">Datos del cliente</h4>

              <form onSubmit={procesarCompra}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>

                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    maxLength={150}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={150}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>

                  <input
                    type="tel"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    maxLength={30}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección de entrega</label>

                  <textarea
                    className="form-control"
                    rows="3"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    maxLength={255}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={cargando}
                >
                  {cargando ? "Procesando pedido..." : "Confirmar pedido"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h4>Resumen del pedido</h4>

              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <span>
                    {item.nombre} × {item.cantidad}
                  </span>

                  <span>
                    $
                    {(Number(item.precio) * item.cantidad).toLocaleString(
                      "es-MX",
                      { minimumFractionDigits: 2 },
                    )}
                  </span>
                </div>
              ))}

              <h5 className="text-end mt-3">
                Total: $
                {totalCompra.toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </h5>

              <Link
                to="/carrito"
                className="btn btn-outline-secondary w-100 mt-2"
              >
                Volver al carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
