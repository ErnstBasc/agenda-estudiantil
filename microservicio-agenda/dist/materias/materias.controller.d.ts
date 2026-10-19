import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { MateriasService } from './materias.service';
export declare class MateriasController {
    private readonly materiasService;
    constructor(materiasService: MateriasService);
    create(dto: CreateMateriaDto): Promise<import("./entities/materia.entity").Materia>;
    findAll(): Promise<import("./entities/materia.entity").Materia[]>;
    findOne(id: number): Promise<import("./entities/materia.entity").Materia>;
    resumen(id: number): Promise<{
        materiaId: number;
        materia: string;
        metaHorasSemanales: number;
        horasEstudiadas: number;
        horasRestantes: number;
        metaCumplida: boolean;
    }>;
    update(id: number, dto: UpdateMateriaDto): Promise<import("./entities/materia.entity").Materia>;
    remove(id: number): Promise<{
        mensaje: string;
    }>;
}
