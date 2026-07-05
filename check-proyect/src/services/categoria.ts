import type { Categoria } from "../models/Categoria";
import { getToken } from "./auth";

const API = import.meta.env.VITE_URL_API;

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function getCategorias(): Promise<Categoria[]> {
  const response = await fetch(`${API}/categorias`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener categorías");
  }

  return response.json();
}

export async function createCategoria(nombre: string): Promise<Categoria> {
  const response = await fetch(`${API}/categoria/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) {
    throw new Error("Error al crear categoría");
  }

  return response.json();
}

export async function updateCategoria(id: number, nombre: string): Promise<Categoria> {
  const response = await fetch(`${API}/categoria/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar categoría");
  }

  return response.json();
}

export async function deleteCategoria(id: number): Promise<void> {
  const response = await fetch(`${API}/categoria/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar categoría");
  }
}
