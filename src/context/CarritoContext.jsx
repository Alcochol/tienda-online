import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const stockDisponible = Number(producto.stock);

    if (stockDisponible <= 0) {
      return {
        ok: false,
        mensaje: "Este producto no tiene existencias.",
      };
    }

    const productoExistente = carrito.find((item) => item.id === producto.id);

    const cantidadActual = productoExistente ? productoExistente.cantidad : 0;

    if (cantidadActual + 1 > stockDisponible) {
      return {
        ok: false,
        mensaje: "No hay existencias suficientes para agregar otra unidad.",
      };
    }

    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    return { ok: true, mensaje: "Producto agregado al carrito." };
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    const cantidad = Number(nuevaCantidad);

    setCarrito((actual) =>
      actual.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const stock = Number(item.stock);

        return {
          ...item,
          cantidad: Math.max(1, Math.min(cantidad, stock)),
        };
      }),
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  const totalCompra = carrito.reduce(
    (total, item) => total + Number(item.precio) * item.cantidad,
    0,
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
        totalCompra,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}

/* import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        ),
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
} */
