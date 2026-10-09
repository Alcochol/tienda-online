import { Link } from "react-router-dom";

function ProductCard({ producto, onAgregar }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
        />

        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>

          <p className="card-text">${producto.precio}</p>
          <p>
            <button
              className="btn btn-success"
              onClick={() => onAgregar(producto)}
            >
              <i className="bi bi-cart"></i> Agregar al carrito
            </button>
          </p>
          <p>
            <Link to={`/productos/${producto.id}`} className="btn btn-primary">
              Ver producto
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
