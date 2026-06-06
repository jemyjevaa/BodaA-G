export interface RSVPData {
  nombre: string;
  asistencia: 'si' | 'no' | '';
  personas: number;
  telefono: string;
  dieta: string;
  alergiaDetalles: string;
  mensaje: string;
}

export interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}
