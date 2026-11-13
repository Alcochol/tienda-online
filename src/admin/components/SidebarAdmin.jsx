import { NavLink } from "react-router-dom";

function SidebarAdmin() {
  const menu = [
    { nombre: "Inicio", icono: "bi-house-door", ruta: "/admin" },
    { nombre: "Productos", icono: "bi-box-seam" },
    { nombre: "Categorías", icono: "bi-tags" },
    { nombre: "Inventario", icono: "bi-clipboard-data" },
    { nombre: "Pedidos", icono: "bi-cart-check" },
    { nombre: "Clientes", icono: "bi-people" },
    { nombre: "Reportes", icono: "bi-bar-chart" },
    { nombre: "Usuarios", icono: "bi-person-gear" },
  ];

  return (
    <aside
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh", flexShrink: 0 }}
    >
      <h4 className="text-center mb-4">Tienda Admin</h4>

      <hr />

      <nav className="nav flex-column gap-2">
        {menu.map((item) => (
          <div key={item.nombre}>
            {item.ruta ? (
              <NavLink
                to={item.ruta}
                end
                className={({ isActive }) =>
                  `nav-link text-white rounded ${isActive ? "bg-primary" : ""}`
                }
              >
                <i className={`bi ${item.icono} me-2`}></i>
                {item.nombre}
              </NavLink>
            ) : (
              <span
                className="nav-link text-white-50"
                title="Módulo pendiente de desarrollo"
              >
                <i className={`bi ${item.icono} me-2`}></i>
                {item.nombre}
                <small className="d-block ms-4">Próximamente</small>
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default SidebarAdmin;
