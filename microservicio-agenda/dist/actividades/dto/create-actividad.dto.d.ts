import { EstadoActividad } from '../entities/actividad.entity';
export declare class CreateActividadDto {
    titulo: string;
    descripcion?: string;
    fechaEntrega: string;
    estado?: EstadoActividad;
    materiaId: number;
}
