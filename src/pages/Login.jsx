import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const location = useLocation();

  const destino = location.state?.from?.pathname || "/productos";

  // Obtener la función de autenticación
  const { iniciarSesion } = useAuth();

  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para mensajes y procesamiento
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Procesar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setCargando(true);

    // Llamar al contexto de autenticación
    const resultado = await iniciarSesion(email, password);

    setCargando(false);

    if (!resultado.ok) {
      setMensaje(resultado.mensaje);
      return;
    }

    // Inicio de sesión correcto
    navigate(destino, { replace: true });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Iniciar sesión</h2>

              {/* Mensaje de error */}
              {mensaje && (
                <div className="alert alert-danger" role="alert">
                  {mensaje}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Correo electrónico */}
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Contraseña */}
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                {/* Botón */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={cargando}
                  >
                    {cargando ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      "Ingresar"
                    )}
                  </button>
                </div>
              </form>

              <hr />

              <p className="text-center mb-0">
                ¿No tienes una cuenta?{" "}
                <Link to="/registro">Regístrate aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
