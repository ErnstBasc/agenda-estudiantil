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
exports.ActividadesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const materia_entity_1 = require("../materias/entities/materia.entity");
const actividad_entity_1 = require("./entities/actividad.entity");
let ActividadesService = class ActividadesService {
    repo;
    materiasRepo;
    constructor(repo, materiasRepo) {
        this.repo = repo;
        this.materiasRepo = materiasRepo;
    }
    async verificarMateria(materiaId) {
        const existe = await this.materiasRepo.existsBy({ id: materiaId });
        if (!existe) {
            throw new common_1.NotFoundException(`Materia ${materiaId} no encontrada`);
        }
    }
    async create(dto) {
        await this.verificarMateria(dto.materiaId);
        return this.repo.save(this.repo.create(dto));
    }
    findAll(materiaId) {
        return this.repo.find({
            where: materiaId ? { materiaId } : {},
            order: { fechaEntrega: 'ASC' },
        });
    }
    async findOne(id) {
        const actividad = await this.repo.findOneBy({ id });
        if (!actividad) {
            throw new common_1.NotFoundException(`Actividad ${id} no encontrada`);
        }
        return actividad;
    }
    async update(id, dto) {
        const actividad = await this.findOne(id);
        if (dto.materiaId !== undefined) {
            await this.verificarMateria(dto.materiaId);
        }
        Object.assign(actividad, dto);
        return this.repo.save(actividad);
    }
    async remove(id) {
        const actividad = await this.findOne(id);
        await this.repo.remove(actividad);
        return { mensaje: `Actividad ${id} eliminada` };
    }
};
exports.ActividadesService = ActividadesService;
exports.ActividadesService = ActividadesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(actividad_entity_1.Actividad)),
    __param(1, (0, typeorm_1.InjectRepository)(materia_entity_1.Materia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ActividadesService);
//# sourceMappingURL=actividades.service.js.map