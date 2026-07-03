import type { Producto } from "../models/Producto";
import '../styles/productoCard.css'

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
            <div className="producto-card card">
                <div className="card-body">
                    <h3 className="card-title text-center mb-3">{producto.nombre}</h3>
                    <table className="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <td className="label">Código</td>
                                <td className="text-end">{producto.codigo_de_barras}</td>
                            </tr>
                            {producto.nombre_categoria && (
                                <tr>
                                    <td className="label">Categoría</td>
                                    <td className="text-end">{producto.nombre_categoria}</td>
                                </tr>
                            )}
                            <tr>
                                <td className="label">Precio</td>
                                <td className="text-end precio">{formatearPrecio(producto.precio)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="btn-nueva-busqueda"
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
