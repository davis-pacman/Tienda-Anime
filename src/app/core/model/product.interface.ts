export interface Product {
    id: number;
    nombre: string;
    categoria: string;
    stock: number;
    precioActual: number;
    precioAntes?: number | null;
    imagenUrl: string;
    descripcion?: string;
    esPersonalizado?: boolean;
    especificaciones?: Array<{ nombre: string; valor: string }>;
}
