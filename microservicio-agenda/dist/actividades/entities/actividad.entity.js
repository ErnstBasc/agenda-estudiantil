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
exports.Actividad = exports.EstadoActividad = void 0;
const typeorm_1 = require("typeorm");
const materia_entity_1 = require("../../materias/entities/materia.entity");
var EstadoActividad;
(function (EstadoActividad) {
    EstadoActividad["PENDIENTE"] = "PENDIENTE";
    EstadoActividad["EN_PROGRESO"] = "EN_PROGRESO";
    EstadoActividad["COMPLETADA"] = "COMPLETADA";
})(EstadoActividad || (exports.EstadoActividad = EstadoActividad = {}));
let Actividad = class Actividad {
    id;
    titulo;
    descripcion;
    fechaEntrega;
    estado;
    materia;
    materiaId;
};
exports.Actividad = Actividad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Actividad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Actividad.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Actividad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Actividad.prototype, "fechaEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoActividad, default: EstadoActividad.PENDIENTE }),
    __metadata("design:type", String)
], Actividad.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => materia_entity_1.Materia, (m) => m.actividades, { nullable: false, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'materiaId' }),
    __metadata("design:type", materia_entity_1.Materia)
], Actividad.prototype, "materia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Actividad.prototype, "materiaId", void 0);
exports.Actividad = Actividad = __decorate([
    (0, typeorm_1.Entity)('actividades')
], Actividad);
//# sourceMappingURL=actividad.entity.js.map