export interface OrderItem {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
}

export interface Order {
  id?: number;
  clienteNombre: string;
  correo: string;
  telefono: string;
  direccion: string;
  metodoPago: string;
  observacion?: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  estado?: string;
  fecha?: string;
}
