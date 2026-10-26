import { useEffect, useState } from "react";

const API_URL = "http://localhost:9191/tienda-api/api";

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  useEffect(() => {
    async function cargarPedidos() {
      try {
        const respuesta = await fetch(`${API_URL}/pedidos.php`);
        const data = await respuesta.json();

        if (!respuesta.ok || !data.ok) {
          throw new Error(data.error || "No se pudieron cargar los pedidos.");
        }

        setPedidos(data.pedidos);
      } catch (err) {
        setError(err.message || "Error de conexión con la API.");
      } finally {
        setCargando(false);
      }
    }

    cargarPedidos();
  }, []);

  async function verDetalle(id) {
    setPedidoSeleccionado(id);
    setDetalles([]);
    setCargandoDetalle(true);
    setError("");

    try {
      const respuesta = await fetch(
        `${API_URL}/detalle_pedido.php?id=${encodeURIComponent(id)}`,
      );

      const data = await respuesta.json();

      if (!respuesta.ok || !data.ok) {
        throw new Error(data.error || "No se pudo cargar el detalle.");
      }

      setDetalles(data.detalles);
    } catch (err) {
      setError(err.message || "Error al consultar el detalle.");
    } finally {
      setCargandoDetalle(false);
    }
  }

  function formatoMoneda(valor) {
    return Number(valor).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  }

  if (cargando) {
    return <div className="container py-5">Cargando pedidos...</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Historial de pedidos</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {pedidos.length === 0 ? (
        <div className="alert alert-info">
          Todavía no hay pedidos registrados.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>#{pedido.id}</td>
                  <td>{pedido.nombre_cliente}</td>
                  <td>{pedido.fecha}</td>
                  <td>
                    <span className="badge text-bg-warning">
                      {pedido.estatus}
                    </span>
                  </td>
                  <td>{formatoMoneda(pedido.total)}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => verDetalle(pedido.id)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pedidoSeleccionado !== null && (
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Detalle del pedido #{pedidoSeleccionado}</h5>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                setPedidoSeleccionado(null);
                setDetalles([]);
              }}
            >
              Cerrar
            </button>
          </div>

          <div className="card-body">
            {cargandoDetalle ? (
              <p>Cargando detalle...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio unitario</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {detalles.map((item) => (
                      <tr key={item.producto_id}>
                        <td>{item.nombre_producto}</td>
                        <td>{formatoMoneda(item.precio_unitario)}</td>
                        <td>{item.cantidad}</td>
                        <td>{formatoMoneda(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
