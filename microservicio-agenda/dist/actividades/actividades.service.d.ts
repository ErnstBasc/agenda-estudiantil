import { Repository } from 'typeorm';
import { Materia } from '../materias/entities/materia.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { Actividad } from './entities/actividad.entity';
export declare class ActividadesService {
    private readonly repo;
    private readonly materiasRepo;
    constructor(repo: Repository<Actividad>, materiasRepo: Repository<Materia>);
    private verificarMateria;
    create(dto: CreateActividadDto): Promise<Actividad>;
    findAll(materiaId?: number): Promise<Actividad[]>;
    findOne(id: number): Promise<Actividad>;
    update(id: number, dto: UpdateActividadDto): Promise<Actividad>;
    remove(id: number): Promise<{
        mensaje: string;
    }>;
}
