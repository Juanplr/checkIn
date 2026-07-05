import { useState, useEffect } from "react";
import Header from "../components/Header";
import { getUser } from "../services/auth";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../services/categoria";
import { getUsuario, updateUsuario } from "../services/usuario";
import type { UsuarioPublic } from "../services/usuario";
import type { Categoria } from "../models/Categoria";
import "../styles/ajustes.css"

function Ajustes() {
  const [usuario, setUsuario] = useState<UsuarioPublic | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [editandoCategoria, setEditandoCategoria] = useState<Categoria | null>(null);
  const [formPerfil, setFormPerfil] = useState({ nombre: "", contrasena: "" });
  const [formCategoria, setFormCategoria] = useState({ nombre: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setLoading(true);
    setError("");
    try {
      const userData = getUser();
      if (!userData?.id) throw new Error("Sesión no válida");
      const [usr, cats] = await Promise.all([
        getUsuario(userData.id),
        getCategorias(),
      ]);
      setUsuario(usr);
      setCategorias(cats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }

  function abrirModalPerfil() {
    if (!usuario) return;
    setFormPerfil({ nombre: usuario.nombre, contrasena: "" });
    setShowModalPerfil(true);
  }

  function abrirModalCategoria(categoria?: Categoria) {
    if (categoria) {
      setEditandoCategoria(categoria);
      setFormCategoria({ nombre: categoria.nombre });
    } else {
      setEditandoCategoria(null);
      setFormCategoria({ nombre: "" });
    }
    setShowModalCategoria(true);
  }

  async function guardarPerfil() {
    if (!formPerfil.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      const userData = getUser();
      if (!userData?.id) throw new Error("Sesión no válida");

      const payload: { nombre?: string; contrasena?: string } = { nombre: formPerfil.nombre.trim() };
      if (formPerfil.contrasena) {
        payload.contrasena = formPerfil.contrasena;
      }

      const updated = await updateUsuario(userData.id, payload);
      setUsuario(updated);
      setShowModalPerfil(false);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar perfil");
    }
  }

  async function guardarCategoria() {
    if (!formCategoria.nombre.trim()) {
      setError("El nombre de la categoría es obligatorio");
      return;
    }

    try {
      if (editandoCategoria) {
        await updateCategoria(editandoCategoria.id, formCategoria.nombre.trim());
      } else {
        await createCategoria(formCategoria.nombre.trim());
      }
      setShowModalCategoria(false);
      setError("");
      const cats = await getCategorias();
      setCategorias(cats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar categoría");
    }
  }

  async function eliminarCategoria(id: number, nombre: string) {
    if (!confirm(`¿Eliminar la categoría "${nombre}"?`)) return;
    try {
      await deleteCategoria(id);
      setError("");
      const cats = await getCategorias();
      setCategorias(cats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al eliminar categoría");
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="container py-4 text-center">
          <div className="spinner-border text-light" role="status" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-4 ajustes-page">

        {error && <div className="ajustes-alert">{error}</div>}

        {/* ---- Perfil ---- */}
        <div className="ajustes-card">
          <div className="card-header">
            <h3>Mi Perfil</h3>
          </div>
          <div className="card-body">
            <div className="perfil-info">
              <div className="perfil-row">
                <span className="perfil-label">Nombre</span>
                <span className="perfil-valor">{usuario?.nombre || "-"}</span>
              </div>
              <div className="perfil-row">
                <span className="perfil-label">Usuario</span>
                <span className="perfil-valor">{usuario?.user_name || "-"}</span>
              </div>
              <div className="perfil-row">
                <span className="perfil-label">Email</span>
                <span className="perfil-valor">{usuario?.correo || "-"}</span>
              </div>
              <div className="perfil-actions">
                <button className="btn-editar" onClick={abrirModalPerfil}>
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Categorías ---- */}
        <div className="ajustes-card">
          <div className="card-header">
            <h3>Categorías</h3>
            <button className="btn-nuevo" onClick={() => abrirModalCategoria()}>
              + Nueva
            </button>
          </div>
          <div className="card-body">
            {categorias.length === 0 ? (
              <div className="categorias-empty">
                No hay categorías registradas
              </div>
            ) : (
              <table className="categorias-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th className="col-acciones">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nombre}</td>
                      <td>
                        <div className="acciones-wrapper">
                          <button
                            className="btn-accion editar"
                            onClick={() => abrirModalCategoria(c)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-accion eliminar"
                            onClick={() => eliminarCategoria(c.id, c.nombre)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* ---- Modal Perfil ---- */}
        {showModalPerfil && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content ajustes-modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Perfil</h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModalPerfil(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formPerfil.nombre}
                      onChange={(e) => setFormPerfil({ ...formPerfil, nombre: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Dejar en blanco para mantener"
                      value={formPerfil.contrasena}
                      onChange={(e) => setFormPerfil({ ...formPerfil, contrasena: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-cancelar" onClick={() => setShowModalPerfil(false)}>Cancelar</button>
                  <button className="btn-guardar" onClick={guardarPerfil}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Modal Categoría ---- */}
        {showModalCategoria && (
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content ajustes-modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editandoCategoria ? "Editar Categoría" : "Nueva Categoría"}
                  </h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModalCategoria(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formCategoria.nombre}
                      onChange={(e) => setFormCategoria({ nombre: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-cancelar" onClick={() => setShowModalCategoria(false)}>Cancelar</button>
                  <button className="btn-guardar" onClick={guardarCategoria}>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Ajustes;
