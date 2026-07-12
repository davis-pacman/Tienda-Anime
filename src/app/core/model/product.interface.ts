import { Specification } from "./specification.interface";

export interface Product {
    id: number;
    slug: string;
    esPersonalizado?: boolean;
    imagenUrl: string;
    nombre: string;
    categoria: string;
    stock: number;
    precioActual: number;
    precioAntes?: number;
    descripcion: string;
    especificaiones: Specification[];
}
