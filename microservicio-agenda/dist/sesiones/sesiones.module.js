"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesionesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const actividad_entity_1 = require("../actividades/entities/actividad.entity");
const materia_entity_1 = require("../materias/entities/materia.entity");
const sesion_entity_1 = require("./entities/sesion.entity");
const sesiones_controller_1 = require("./sesiones.controller");
const sesiones_service_1 = require("./sesiones.service");
let SesionesModule = class SesionesModule {
};
exports.SesionesModule = SesionesModule;
exports.SesionesModule = SesionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sesion_entity_1.Sesion, materia_entity_1.Materia, actividad_entity_1.Actividad])],
        controllers: [sesiones_controller_1.SesionesController],
        providers: [sesiones_service_1.SesionesService],
    })
], SesionesModule);
//# sourceMappingURL=sesiones.module.js.map