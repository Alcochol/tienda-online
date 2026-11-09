import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cantidadTotal } = useCarrito();

  const { usuario, autenticado, cargando, cerrarSesion } = useAuth();

  const navigate = useNavigate();

  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleCerrarSesion = async () => {
    setMensajeError("");
    setCerrandoSesion(true);

    const resultado = await cerrarSesion();

    setCerrandoSesion(false);

    if (resultado.ok) {
      navigate("/productos", { replace: true });
    } else {
      setMensajeError(resultado.mensaje);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Mostrar menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>

            {!cargando && autenticado && (
              <li className="nav-item">
                <Link className="nav-link" to="/mis-pedidos">
                  Mis Pedidos
                </Link>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="#">
                Categorías
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link to="/carrito" className="btn btn-outline-light">
              <i className="bi bi-cart"></i> Carrito ({cantidadTotal})
            </Link>

            {!cargando && !autenticado && (
              <>
                <Link to="/login" className="btn btn-outline-light">
                  Iniciar sesión
                </Link>

                <Link to="/registro" className="btn btn-primary">
                  Registrarse
                </Link>
              </>
            )}

            {!cargando && autenticado && (
              <>
                <span className="text-white">
                  <i className="bi bi-person-circle"></i> Hola, {usuario.nombre}
                </span>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCerrarSesion}
                  disabled={cerrandoSesion}
                >
                  {cerrandoSesion ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Cerrando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {mensajeError && (
            <div className="alert alert-danger ms-2 mb-0 py-1">
              {mensajeError}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
