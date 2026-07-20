export interface CartItem {
  id: number;
  productoId?: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
  categoria: string;
}
