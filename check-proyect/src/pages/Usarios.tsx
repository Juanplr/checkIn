import { useState, useEffect } from "react";
import Header from "../components/Header";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../services/usuario";
import type { UsuarioPublic, UsuarioCreate, UsuarioUpdate } from "../services/usuario";
import "../styles/usuarios.css"

function Usarios() {
  const [usuarios, setUsuarios] = useState<UsuarioPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<UsuarioPublic | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    user_name: "",
    correo: "",
    contrasena: "",
    es_administrador: false,
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    setLoading(true);
    setError("");
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }

  function abrirModal(usuario?: UsuarioPublic) {
    if (usuario) {
      setEditando(usuario);
      setForm({
        nombre: usuario.nombre,
        user_name: usuario.user_name,
        correo: usuario.correo,
        contrasena: "",
        es_administrador: usuario.es_administrador,
      });
    } else {
      setEditando(null);
      setForm({
        nombre: "",
        user_name: "",
        correo: "",
        contrasena: "",
        es_administrador: false,
      });
    }
    setShowModal(true);
  }

  async function guardar() {
    if (!form.nombre.trim() || !form.user_name.trim() || !form.correo.trim()) {
      setError("Nombre, usuario y correo son obligatorios");
      return;
    }

    if (!editando && !form.contrasena) {
      setError("La contraseña es obligatoria para nuevos usuarios");
      return;
    }

    try {
      if (editando) {
        const payload: UsuarioUpdate = { nombre: form.nombre.trim(), user_name: form.user_name.trim(), correo: form.correo.trim(), es_administrador: form.es_administrador };
        if (form.contrasena) payload.contrasena = form.contrasena;
        await updateUsuario(editando.id, payload);
      } else {
        const payload: UsuarioCreate = {
          nombre: form.nombre.trim(),
          user_name: form.user_name.trim(),
          correo: form.correo.trim(),
          contrasena: form.contrasena,
          es_administrador: form.es_administrador,
        };
        await createUsuario(payload);
      }

      setShowModal(false);
      setError("");
      await cargarUsuarios();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar usuario");
    }
  }

  async function eliminar(id: number, nombre: string) {
    if (!confirm(`¿Eliminar al usuario "${nombre}"?`)) return;
    try {
      await deleteUsuario(id);
      setError("");
      await cargarUsuarios();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al eliminar usuario");
    }
  }

  return (
    <>
      <Header />
      <div className="container py-4 usuarios-page">

        <div className="usuarios-header">
          <h2>Usuarios</h2>
          <button className="btn-nuevo" onClick={() => abrirModal()}>
            + Nuevo Usuario
          </button>
        </div>

        {error && <div className="usuarios-alert">{error}</div>}

        {loading ? (
          <div className="usuarios-spinner">
            <div className="spinner-border text-light" role="status" />
          </div>
        ) : usuarios.length === 0 ? (
          <div className="usuarios-empty">
            <p>No hay usuarios registrados</p>
          </div>
        ) : (
          <div className="table-responsive usuarios-table">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th className="col-acciones">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.user_name}</td>
                    <td>{u.correo}</td>
                    <td>
                      <span className={u.es_administrador ? "badge-admin" : "badge-user"}>
                        {u.es_administrador ? "Admin" : "Usuario"}
                      </span>
                    </td>
                    <td>
                      <div className="acciones-wrapper">
                        <button className="btn-accion editar" onClick={() => abrirModal(u)}>
                          Editar
                        </button>
                        <button className="btn-accion eliminar" onClick={() => eliminar(u.id, u.nombre)}>
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
          <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content usuarios-modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editando ? "Editar Usuario" : "Nuevo Usuario"}</h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" value={form.user_name}
                      onChange={(e) => setForm({ ...form, user_name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.correo}
                      onChange={(e) => setForm({ ...form, correo: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Contraseña {editando ? "(dejar en blanco para mantener)" : ""}
                    </label>
                    <input type="password" className="form-control"
                      placeholder={editando ? "Dejar en blanco para mantener" : "Contraseña"}
                      value={form.contrasena}
                      onChange={(e) => setForm({ ...form, contrasena: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="esAdmin"
                        checked={form.es_administrador}
                        onChange={(e) => setForm({ ...form, es_administrador: e.target.checked })} />
                      <label className="form-check-label" htmlFor="esAdmin">
                        Administrador
                      </label>
                    </div>
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
  )
}

export default Usarios;
