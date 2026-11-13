function Dashboard() {
  const indicadores = [
    {
      titulo: "Ventas totales",
      valor: "—",
      icono: "bi-currency-dollar",
      color: "primary",
    },
    {
      titulo: "Pedidos recibidos",
      valor: "—",
      icono: "bi-cart-check",
      color: "success",
    },
    {
      titulo: "Clientes registrados",
      valor: "—",
      icono: "bi-people",
      color: "warning",
    },
    {
      titulo: "Productos disponibles",
      valor: "—",
      icono: "bi-box-seam",
      color: "info",
    },
  ];

  return (
    <>
      <h2 className="mb-1">Dashboard</h2>
      <p className="text-muted mb-4">Resumen general de la tienda online.</p>

      <div className="row g-4">
        {indicadores.map((item) => (
          <div className="col-12 col-sm-6 col-xl-3" key={item.titulo}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-2">{item.titulo}</p>
                  <h3 className="mb-0">{item.valor}</h3>
                </div>

                <div
                  className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded p-3`}
                >
                  <i className={`bi ${item.icono} fs-3`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h5>Bienvenido al panel administrativo</h5>
          <p className="text-muted mb-0">
            Desde aquí podrás administrar productos, pedidos, clientes,
            inventario y reportes de tu tienda.
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
