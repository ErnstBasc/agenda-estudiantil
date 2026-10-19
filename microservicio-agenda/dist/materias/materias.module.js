"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const actividad_entity_1 = require("../actividades/entities/actividad.entity");
const sesion_entity_1 = require("../sesiones/entities/sesion.entity");
const materia_entity_1 = require("./entities/materia.entity");
const materias_controller_1 = require("./materias.controller");
const materias_service_1 = require("./materias.service");
let MateriasModule = class MateriasModule {
};
exports.MateriasModule = MateriasModule;
exports.MateriasModule = MateriasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([materia_entity_1.Materia, actividad_entity_1.Actividad, sesion_entity_1.Sesion])],
        controllers: [materias_controller_1.MateriasController],
        providers: [materias_service_1.MateriasService],
    })
], MateriasModule);
//# sourceMappingURL=materias.module.js.map