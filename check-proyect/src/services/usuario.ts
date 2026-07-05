import { getToken } from "./auth";

const API = import.meta.env.VITE_URL_API;

export interface UsuarioPublic {
  id: number;
  nombre: string;
  user_name: string;
  es_administrador: boolean;
  correo: string;
}

export interface UsuarioCreate {
  nombre: string;
  user_name: string;
  correo: string;
  contrasena: string;
  es_administrador: boolean;
}

export type UsuarioUpdate = Partial<Omit<UsuarioCreate, "contrasena"> & { contrasena: string }>;

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getUsuarios(): Promise<UsuarioPublic[]> {
  const response = await fetch(`${API}/usuarios`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  return response.json();
}

export async function getUsuario(id: number): Promise<UsuarioPublic> {
  const response = await fetch(`${API}/usuario/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener usuario");
  }

  return response.json();
}

export async function createUsuario(data: UsuarioCreate): Promise<UsuarioPublic> {
  const response = await fetch(`${API}/usuario/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }

  return response.json();
}

export async function updateUsuario(
  id: number,
  data: UsuarioUpdate
): Promise<UsuarioPublic> {
  const response = await fetch(`${API}/usuario/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }

  return response.json();
}

export async function deleteUsuario(id: number): Promise<void> {
  const response = await fetch(`${API}/usuario/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar usuario");
  }
}
