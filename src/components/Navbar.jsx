import { useCarrito } from "../context/CarritoContext";

import { Link } from "react-router-dom";

function Navbar() {
  const { cantidadTotal } = useCarrito();

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

            <li className="nav-item">
              <a className="nav-link" href="#">
                Categorías
              </a>
            </li>

            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-light ms-2">
                Iniciar sesión
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/registro" className="btn btn-primary ms-2">
                Registrarse
              </Link>
            </li>
          </ul>

          <Link to="/carrito" className="btn btn-outline-light">
            <i className="bi bi-cart"></i> Carrito ({cantidadTotal})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
