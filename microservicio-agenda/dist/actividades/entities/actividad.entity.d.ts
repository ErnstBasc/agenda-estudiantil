import { Materia } from '../../materias/entities/materia.entity';
export declare enum EstadoActividad {
    PENDIENTE = "PENDIENTE",
    EN_PROGRESO = "EN_PROGRESO",
    COMPLETADA = "COMPLETADA"
}
export declare class Actividad {
    id: number;
    titulo: string;
    descripcion?: string;
    fechaEntrega: string;
    estado: EstadoActividad;
    materia: Materia;
    materiaId: number;
}
