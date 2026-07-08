import { Specification } from "./specification.interface";

export interface Product {
    id: number;
    nombre: string;
    slug: string;
    categoria: string;
    stock: number;
    precioActual: number;
    precioAntes: number;
    descripcion: string;
    imagenUrl: string;
    especificaiones: Specification[];
}
