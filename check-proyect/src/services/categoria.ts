import type { Categoria } from "../models/Categoria";
import { getToken } from "./auth";

const API = import.meta.env.VITE_URL_API;

export async function getCategorias(): Promise<Categoria[]> {
  const response = await fetch(`${API}/categorias`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener categorías");
  }

  return response.json();
}
