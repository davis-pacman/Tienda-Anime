export interface BlogPost {
  id: number;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  categoria: string;
  fecha: string;
  autor: string;
  imagenUrl: string;
  lecturaMinutos: number;
  destacado?: boolean;
}
