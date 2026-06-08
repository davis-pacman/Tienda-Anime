export interface Producto {
    id: number;
    esPersonalizado: boolean;
    nombre: string;
    categoria: string;
    stock: number;
    precio: number;
    precioAntes: number;
    imagenUrl: string;
}
