function Caja({ children }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Caja;
