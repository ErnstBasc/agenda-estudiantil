import { Repository } from 'typeorm';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';
export declare class MateriasService {
    private readonly repo;
    private readonly actividadesRepo;
    private readonly sesionesRepo;
    constructor(repo: Repository<Materia>, actividadesRepo: Repository<Actividad>, sesionesRepo: Repository<Sesion>);
    create(dto: CreateMateriaDto): Promise<Materia>;
    findAll(): Promise<Materia[]>;
    findOne(id: number): Promise<Materia>;
    update(id: number, dto: UpdateMateriaDto): Promise<Materia>;
    remove(id: number): Promise<{
        mensaje: string;
    }>;
    resumen(id: number): Promise<{
        materiaId: number;
        materia: string;
        metaHorasSemanales: number;
        horasEstudiadas: number;
        horasRestantes: number;
        metaCumplida: boolean;
    }>;
}
