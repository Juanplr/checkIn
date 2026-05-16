import type { Producto } from "../models/Producto";

const API = import.meta.env.VITE_URL_API;



export async function getProductoByBarcode(codigo: string): Promise<Producto> {
  const response = await fetch(`${API}/producto/${codigo}`);

  if (response.status === 404) {
    throw new Error("Producto no encontrado");
  }

  if (!response.ok) {
    throw new Error("Error al buscar el producto");
  }

  return response.json();
}
