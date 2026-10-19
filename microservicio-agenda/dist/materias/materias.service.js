"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const actividad_entity_1 = require("../actividades/entities/actividad.entity");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
const materia_entity_1 = require("./entities/materia.entity");
let MateriasService = class MateriasService {
    repo;
    actividadesRepo;
    sesionesRepo;
    constructor(repo, actividadesRepo, sesionesRepo) {
        this.repo = repo;
        this.actividadesRepo = actividadesRepo;
        this.sesionesRepo = sesionesRepo;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    findAll() {
        return this.repo.find();
    }
    async findOne(id) {
        const materia = await this.repo.findOneBy({ id });
        if (!materia) {
            throw new common_1.NotFoundException(`Materia ${id} no encontrada`);
        }
        return materia;
    }
    async update(id, dto) {
        const materia = await this.findOne(id);
        Object.assign(materia, dto);
        return this.repo.save(materia);
    }
    async remove(id) {
        const materia = await this.findOne(id);
        const actividades = await this.actividadesRepo.count({ where: { materiaId: id } });
        const sesiones = await this.sesionesRepo.count({ where: { materiaId: id } });
        if (actividades > 0 || sesiones > 0) {
            throw new common_1.ConflictException('No se puede eliminar la materia porque tiene actividades o sesiones asociadas');
        }
        await this.repo.remove(materia);
        return { mensaje: `Materia ${id} eliminada` };
    }
    async resumen(id) {
        const materia = await this.findOne(id);
        const ahora = new Date();
        const inicioSemana = new Date(ahora);
        inicioSemana.setDate(ahora.getDate() - ((ahora.getDay() + 6) % 7));
        inicioSemana.setHours(0, 0, 0, 0);
        const sesiones = await this.sesionesRepo.find({
            where: { materiaId: id, inicio: (0, typeorm_2.MoreThanOrEqual)(inicioSemana) },
        });
        const horas = sesiones.reduce((total, s) => total + (s.fin.getTime() - s.inicio.getTime()) / 3600000, 0);
        const horasEstudiadas = Math.round(horas * 100) / 100;
        const meta = materia.metaHorasSemanales;
        return {
            materiaId: id,
            materia: materia.nombre,
            metaHorasSemanales: meta,
            horasEstudiadas,
            horasRestantes: Math.max(0, Math.round((meta - horasEstudiadas) * 100) / 100),
            metaCumplida: horasEstudiadas >= meta,
        };
    }
};
exports.MateriasService = MateriasService;
exports.MateriasService = MateriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(materia_entity_1.Materia)),
    __param(1, (0, typeorm_1.InjectRepository)(actividad_entity_1.Actividad)),
    __param(2, (0, typeorm_1.InjectRepository)(sesion_entity_1.Sesion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MateriasService);
//# sourceMappingURL=materias.service.js.map