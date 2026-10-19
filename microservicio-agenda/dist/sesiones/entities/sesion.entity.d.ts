import { Actividad } from '../../actividades/entities/actividad.entity';
import { Materia } from '../../materias/entities/materia.entity';
export declare class Sesion {
    id: number;
    inicio: Date;
    fin: Date;
    notas?: string;
    materia: Materia;
    materiaId: number;
    actividad?: Actividad | null;
    actividadId?: number | null;
}
