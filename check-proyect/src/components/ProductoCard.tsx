import type { Producto } from "../models/Producto";

function formatearPrecio(precio: string) {
    const num = parseFloat(precio);
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    }).format(num);
}

function ProductoCard({ producto, onReset }: { producto: Producto; onReset: () => void }) {

    return (
        <>
            <div className="card w-100" style={{ maxWidth: 500, backgroundColor: "#1a1a2e", color: "#fff", border: "1px solid #e94560" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-3">{producto.nombre}</h3>
                    <table className="table table-borderless text-light mb-0">
                        <tbody>
                            <tr>
                                <td className="fw-bold" style={{ color: "#e94560" }}>Código</td>
                                <td className="text-end">{producto.codigo_de_barras}</td>
                            </tr>
                            {producto.nombre_categoria && (
                                <tr>
                                    <td className="fw-bold" style={{ color: "#e94560" }}>Categoría</td>
                                    <td className="text-end">{producto.nombre_categoria}</td>
                                </tr>
                            )}
                            <tr>
                                <td className="fw-bold" style={{ color: "#e94560" }}>Precio</td>
                                <td className="text-end fs-4" style={{ color: "#4ecca3" }}>
                                    {formatearPrecio(producto.precio)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="btn btn-outline-light w-100 mt-3"
                        onClick={onReset}
                    >
                        Nueva búsqueda
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductoCard;
