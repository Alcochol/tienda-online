import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const AuthContext = createContext();

// Dirección base de nuestra API PHP
const API_URL = "http://localhost:9191/tienda-api/api";

// Proveedor de autenticación
export function AuthProvider({ children }) {
  // Usuario actualmente autenticado
  const [usuario, setUsuario] = useState(null);

  // Indica si se está comprobando la sesión
  const [cargando, setCargando] = useState(true);

  // Indica si existe un usuario autenticado
  const autenticado = usuario !== null;

  // Verificar si existe una sesión PHP
  const verificarSesion = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/verificar_sesion.php`, {
        method: "GET",
        credentials: "include",
      });

      const datos = await respuesta.json();

      if (respuesta.ok && datos.ok) {
        setUsuario(datos.usuario);
        return true;
      }

      setUsuario(null);
      return false;
    } catch (error) {
      console.error("Error al verificar sesión:", error);

      setUsuario(null);
      return false;
    }
  };

  // Iniciar sesión
  const iniciarSesion = async (email, password) => {
    try {
      const respuesta = await fetch(`${API_URL}/login.php`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.ok) {
        return {
          ok: false,
          mensaje: datos.mensaje || "No fue posible iniciar sesión",
        };
      }

      setUsuario(datos.usuario);

      return {
        ok: true,
        mensaje: datos.mensaje,
        usuario: datos.usuario,
      };
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      return {
        ok: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/logout.php`, {
        method: "POST",
        credentials: "include",
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.ok) {
        return {
          ok: false,
          mensaje: datos.mensaje || "No fue posible cerrar sesión",
        };
      }

      setUsuario(null);

      return {
        ok: true,
        mensaje: datos.mensaje,
      };
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      return {
        ok: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  // Comprobar sesión al cargar la aplicación
  useEffect(() => {
    const cargarSesion = async () => {
      await verificarSesion();
      setCargando(false);
    };

    cargarSesion();
  }, []);

  // Compartir los datos y funciones con toda la aplicación
  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado,
        cargando,
        iniciarSesion,
        cerrarSesion,
        verificarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para utilizar la autenticación
export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return contexto;
}
