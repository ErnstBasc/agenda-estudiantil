import { Repository } from 'typeorm';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Materia } from '../materias/entities/materia.entity';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { Sesion } from './entities/sesion.entity';
export declare class SesionesService {
    private readonly repo;
    private readonly materiasRepo;
    private readonly actividadesRepo;
    constructor(repo: Repository<Sesion>, materiasRepo: Repository<Materia>, actividadesRepo: Repository<Actividad>);
    private validarFechas;
    private verificarReferencias;
    create(dto: CreateSesionDto): Promise<Sesion>;
    findAll(materiaId?: number): Promise<Sesion[]>;
    findOne(id: number): Promise<Sesion>;
    update(id: number, dto: UpdateSesionDto): Promise<Sesion>;
    remove(id: number): Promise<{
        mensaje: string;
    }>;
}
