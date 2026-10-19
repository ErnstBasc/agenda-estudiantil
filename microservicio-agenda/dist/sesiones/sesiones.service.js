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
exports.SesionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const actividad_entity_1 = require("../actividades/entities/actividad.entity");
const materia_entity_1 = require("../materias/entities/materia.entity");
const sesion_entity_1 = require("./entities/sesion.entity");
let SesionesService = class SesionesService {
    repo;
    materiasRepo;
    actividadesRepo;
    constructor(repo, materiasRepo, actividadesRepo) {
        this.repo = repo;
        this.materiasRepo = materiasRepo;
        this.actividadesRepo = actividadesRepo;
    }
    validarFechas(inicio, fin) {
        if (fin <= inicio) {
            throw new common_1.BadRequestException('La fecha de fin debe ser posterior a la de inicio');
        }
    }
    async verificarReferencias(materiaId, actividadId) {
        const existe = await this.materiasRepo.existsBy({ id: materiaId });
        if (!existe) {
            throw new common_1.NotFoundException(`Materia ${materiaId} no encontrada`);
        }
        if (actividadId) {
            const actividad = await this.actividadesRepo.findOneBy({ id: actividadId });
            if (!actividad) {
                throw new common_1.NotFoundException(`Actividad ${actividadId} no encontrada`);
            }
            if (actividad.materiaId !== materiaId) {
                throw new common_1.BadRequestException('La actividad no pertenece a la materia indicada');
            }
        }
    }
    async create(dto) {
        const inicio = new Date(dto.inicio);
        const fin = new Date(dto.fin);
        this.validarFechas(inicio, fin);
        await this.verificarReferencias(dto.materiaId, dto.actividadId);
        return this.repo.save(this.repo.create({ ...dto, inicio, fin }));
    }
    findAll(materiaId) {
        return this.repo.find({
            where: materiaId ? { materiaId } : {},
            order: { inicio: 'DESC' },
        });
    }
    async findOne(id) {
        const sesion = await this.repo.findOneBy({ id });
        if (!sesion) {
            throw new common_1.NotFoundException(`Sesión ${id} no encontrada`);
        }
        return sesion;
    }
    async update(id, dto) {
        const sesion = await this.findOne(id);
        const inicio = dto.inicio ? new Date(dto.inicio) : sesion.inicio;
        const fin = dto.fin ? new Date(dto.fin) : sesion.fin;
        this.validarFechas(inicio, fin);
        const materiaId = dto.materiaId ?? sesion.materiaId;
        const actividadId = dto.actividadId !== undefined ? dto.actividadId : sesion.actividadId;
        await this.verificarReferencias(materiaId, actividadId);
        Object.assign(sesion, { ...dto, inicio, fin });
        return this.repo.save(sesion);
    }
    async remove(id) {
        const sesion = await this.findOne(id);
        await this.repo.remove(sesion);
        return { mensaje: `Sesión ${id} eliminada` };
    }
};
exports.SesionesService = SesionesService;
exports.SesionesService = SesionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sesion_entity_1.Sesion)),
    __param(1, (0, typeorm_1.InjectRepository)(materia_entity_1.Materia)),
    __param(2, (0, typeorm_1.InjectRepository)(actividad_entity_1.Actividad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SesionesService);
//# sourceMappingURL=sesiones.service.js.map