export interface Producto {
  id: number;
  nombre: string;
  codigo_de_barras: string;
  precio: string;
  nombre_usuario: string | null;
  nombre_categoria: string | null;
}