export interface SupportTicket {
  id?: number;
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
  prioridad: 'baja' | 'media' | 'alta';
  estado?: 'abierto' | 'en-progreso' | 'cerrado';
  fecha?: string;
}
