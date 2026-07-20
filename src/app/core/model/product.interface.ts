import { Specification } from "./specification.interface";

export interface Product {
    id?: string;
    slug: string;
    esPersonalizado?: boolean;
    imagenUrl: string;
    nombre: string;
    categoria: string;
    stock: number;
    precioActual: number;
    precioAntes?: number;
    descripcion: string;
    especificaciones: Specification[];
    seleccionado?: boolean;
}
