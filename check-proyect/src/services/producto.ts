import type { Producto } from "../models/Producto";
import { getToken } from "./auth";

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

export async function getProductos(): Promise<Producto[]> {
  const response = await fetch(`${API}/productos`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}

export interface ProductoCreate {
  nombre: string;
  codigo_de_barras: string;
  precio: number;
  id_usuario: number;
  id_categoria: number;
}

export async function createProducto(data: ProductoCreate): Promise<Producto> {
  const response = await fetch(`${API}/producto/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear producto");
  }

  return response.json();
}

export interface ProductoUpdate {
  nombre?: string;
  codigo_de_barras?: string;
  precio?: number;
  id_usuario?: number;
  id_categoria?: number;
}

export async function updateProducto(id: number, data: ProductoUpdate): Promise<Producto> {
  const response = await fetch(`${API}/producto/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar producto");
  }

  return response.json();
}

export async function deleteProducto(id: number): Promise<void> {
  const response = await fetch(`${API}/producto/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar producto");
  }
}
