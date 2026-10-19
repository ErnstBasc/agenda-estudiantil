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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materia = void 0;
const typeorm_1 = require("typeorm");
const actividad_entity_1 = require("../../actividades/entities/actividad.entity");
const sesion_entity_1 = require("../../sesiones/entities/sesion.entity");
let Materia = class Materia {
    id;
    nombre;
    docente;
    metaHorasSemanales;
    actividades;
    sesiones;
};
exports.Materia = Materia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Materia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Materia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Materia.prototype, "docente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Materia.prototype, "metaHorasSemanales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => actividad_entity_1.Actividad, (a) => a.materia),
    __metadata("design:type", Array)
], Materia.prototype, "actividades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sesion_entity_1.Sesion, (s) => s.materia),
    __metadata("design:type", Array)
], Materia.prototype, "sesiones", void 0);
exports.Materia = Materia = __decorate([
    (0, typeorm_1.Entity)('materias')
], Materia);
//# sourceMappingURL=materia.entity.js.map