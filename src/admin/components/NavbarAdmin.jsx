import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  async function salir() {
    await cerrarSesion();
    navigate("/login");
  }

  return (
    <nav className="navbar bg-white border-bottom px-4 py-3">
      <span className="navbar-brand mb-0 h5">Panel administrativo</span>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">
          <i className="bi bi-person-circle me-2"></i>
          {usuario?.nombre || "Administrador"}
        </span>

        <button className="btn btn-outline-danger btn-sm" onClick={salir}>
          <i className="bi bi-box-arrow-right me-1"></i>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
