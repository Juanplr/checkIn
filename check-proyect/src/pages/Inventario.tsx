import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import type { Producto } from "../models/Producto";
import type { Categoria } from "../models/Categoria";
import { getProductos, createProducto, updateProducto, deleteProducto, type ProductoCreate, type ProductoUpdate } from "../services/producto";
import { getCategorias } from "../services/categoria";
import { getUser } from "../services/auth";
import "../styles/inventario.css"

function Inventario() {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [form, setForm] = useState({ nombre: "", codigo_de_barras: "", precio: "", id_categoria: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    const codigoParam = searchParams.get("codigo");
    if (codigoParam && categorias.length > 0) {
      setForm({ nombre: "", codigo_de_barras: codigoParam, precio: "", id_categoria: categorias[0]?.id || 0 });
      setShowModal(true);
    }
  }, [searchParams, categorias]);

  async function cargarDatos() {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([getProductos(), getCategorias()]);
      setProductos(prods);
      setCategorias(cats);
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }

  function abrirModal(producto?: Producto) {
    if (producto) {
      setEditando(producto);
      setForm({
        nombre: producto.nombre,
        codigo_de_barras: producto.codigo_de_barras,
        precio: producto.precio,
        id_categoria: categorias.find(c => c.nombre === producto.nombre_categoria)?.id || 0,
      });
    } else {
      setEditando(null);
      setForm({ nombre: "", codigo_de_barras: "", precio: "", id_categoria: categorias[0]?.id || 0 });
    }
    setShowModal(true);
  }

  async function guardar() {
    if (!form.nombre || !form.codigo_de_barras || !form.precio || !form.id_categoria) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const user = getUser();
      const payload: ProductoCreate = {
        nombre: form.nombre,
        codigo_de_barras: form.codigo_de_barras,
        precio: parseFloat(form.precio),
        id_usuario: user?.id || 0,
        id_categoria: form.id_categoria,
      };

      if (editando) {
        const upd: ProductoUpdate = { ...payload };
        await updateProducto(editando.id, upd);
      } else {
        await createProducto(payload);
      }

      setShowModal(false);
      setError("");
      cargarDatos();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
    }
  }

  async function eliminar(id: number, nombre: string) {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;
    try {
      await deleteProducto(id);
      cargarDatos();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al eliminar");
    }
  }

  function formatearPrecio(precio: string) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(parseFloat(precio));
  }

  return (
    <>
      <Header />
      <div className="container py-4">

        <div className="d-flex justify-content-between align-items-center mb-3 inventario-header">
          <h2>Inventario</h2>
          <button className="btn-nuevo" onClick={() => abrirModal()}>
            + Nuevo Producto
          </button>
        </div>

        {error && <div className="inventario-alert">{error}</div>}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status" />
          </div>
        ) : productos.length === 0 ? (
          <div className="inventario-empty">
            <p>No hay productos registrados</p>
          </div>
        ) : (
          <div className="table-responsive inventario-table">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th className="col-acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.codigo_de_barras}</td>
                    <td>{p.nombre}</td>
                    <td>{p.nombre_categoria || "-"}</td>
                    <td className="precio">{formatearPrecio(p.precio)}</td>
                    <td>
                      <div className="acciones-wrapper">
                        <button className="btn-accion editar" onClick={() => abrirModal(p)}>
                          Editar
                        </button>
                        <button className="btn-accion eliminar" onClick={() => eliminar(p.id, p.nombre)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="modal d-block inventario-modal-overlay">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content inventario-modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editando ? "Editar Producto" : "Nuevo Producto"}</h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Código de Barras</label>
                    <input type="text" className="form-control" value={form.codigo_de_barras}
                      onChange={(e) => setForm({ ...form, codigo_de_barras: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" step="0.01" className="form-control" value={form.precio}
                      onChange={(e) => setForm({ ...form, precio: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" value={form.id_categoria}
                      onChange={(e) => setForm({ ...form, id_categoria: parseInt(e.target.value) })}>
                      <option value={0}>Seleccionar...</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-cancelar" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button className="btn-guardar" onClick={guardar}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Inventario;
