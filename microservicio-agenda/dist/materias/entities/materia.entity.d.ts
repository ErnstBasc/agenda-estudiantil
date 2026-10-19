import { Actividad } from '../../actividades/entities/actividad.entity';
import { Sesion } from '../../sesiones/entities/sesion.entity';
export declare class Materia {
    id: number;
    nombre: string;
    docente?: string;
    metaHorasSemanales: number;
    actividades: Actividad[];
    sesiones: Sesion[];
}
