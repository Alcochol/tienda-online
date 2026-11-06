import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ rolesPermitidos }) {
  const { usuario, autenticado, cargando } = useAuth();

  const location = useLocation();

  // Mientras PHP verifica la sesión
  if (cargando) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </div>

        <p className="mt-3">Verificando sesión...</p>
      </div>
    );
  }

  // Si no está autenticado, enviarlo al login
  if (!autenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Comprobar roles cuando la ruta los requiera
  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const tienePermiso = usuario.roles.some((rol) =>
      rolesPermitidos.includes(rol),
    );

    if (!tienePermiso) {
      return <Navigate to="/productos" replace />;
    }
  }

  // Si cumple las condiciones, mostrar la página
  return <Outlet />;
}

export default RutaProtegida;
