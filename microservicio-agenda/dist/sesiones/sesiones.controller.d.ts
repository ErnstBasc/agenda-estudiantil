import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { SesionesService } from './sesiones.service';
export declare class SesionesController {
    private readonly sesionesService;
    constructor(sesionesService: SesionesService);
    create(dto: CreateSesionDto): Promise<import("./entities/sesion.entity").Sesion>;
    findAll(materiaId?: number): Promise<import("./entities/sesion.entity").Sesion[]>;
    findOne(id: number): Promise<import("./entities/sesion.entity").Sesion>;
    update(id: number, dto: UpdateSesionDto): Promise<import("./entities/sesion.entity").Sesion>;
    remove(id: number): Promise<{
        mensaje: string;
    }>;
}
