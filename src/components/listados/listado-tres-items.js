function ListadoTresItems({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {children}
    </div>
  );
}

export default ListadoTresItems;
