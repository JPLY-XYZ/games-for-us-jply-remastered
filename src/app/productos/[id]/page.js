async function PaginaProducto({ params }) {
    const { id } = await params

    return (
        <h1 className="text-3xl font-bold">
            Producto #{id}
        </h1>
    );
}

export default PaginaProducto;