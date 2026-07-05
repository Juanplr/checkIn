import "../styles/productoNoEncontrado.css"

interface Props {
    codigo: string;
    onAgregar: () => void;
    onCancelar: () => void;
}

function ProductoNoEncontradoCard({ codigo, onAgregar, onCancelar }: Props) {
    return (
        <div className="producto-no-encontrado card">
            <div className="card-body">
                <h3 className="card-title text-center mb-3">Producto No Encontrado</h3>
                <p className="mensaje">El código</p>
                <p className="codigo-destacado text-center mb-2">{codigo}</p>
                <p className="mensaje">no existe en el inventario.</p>
                <p className="pregunta text-center mt-3 mb-0">¿Deseas agregarlo?</p>
                <div className="acciones">
                    <button className="btn-agregar" onClick={onAgregar}>
                        Agregar al inventario
                    </button>
                    <button className="btn-cancelar" onClick={onCancelar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductoNoEncontradoCard;
