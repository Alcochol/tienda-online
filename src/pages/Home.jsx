import { useCarrito } from "../context/CarritoContext";

function Home() {
  const { carrito, agregarAlCarrito } = useCarrito();
  return (
    <>
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">Compra fácil y rápido</h1>

              <p className="lead">
                Encuentra los mejores productos en nuestra tienda online.
              </p>

              <button className="btn btn-primary btn-lg">Ver productos</button>
            </div>

            <div className="col-md-6 text-center">
              <i className="bi bi-shop" style={{ fontSize: "180px" }}></i>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Productos destacados</h2>

          <div className="row">
            {productos.map((producto) => (
              <div className="col-md-4 mb-4" key={producto.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>

                    <h4 className="text-primary">${producto.precio}</h4>

                    <button
                      className="btn btn-primary"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="mb-4">Carrito</h2>

          {carrito.length === 0 ? (
            <div className="alert alert-info">El carrito está vacío.</div>
          ) : (
            <div>
              {carrito.map((producto, index) => (
                <div className="card mb-2" key={index}>
                  <div className="card-body">
                    <h5>{producto.nombre}</h5>

                    <p>Precio: ${producto.precio}</p>

                    <p>Cantidad: {producto.cantidad}</p>

                    <p>Subtotal: ${producto.precio * producto.cantidad}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const productos = [
  {
    id: 1,
    nombre: "Laptop",
    precio: 15000,
  },
  {
    id: 2,
    nombre: "Teclado",
    precio: 800,
  },
  {
    id: 3,
    nombre: "Mouse",
    precio: 450,
  },
];

export default Home;
