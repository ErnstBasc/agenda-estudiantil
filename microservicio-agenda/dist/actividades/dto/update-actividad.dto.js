"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActividadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_actividad_dto_1 = require("./create-actividad.dto");
class UpdateActividadDto extends (0, swagger_1.PartialType)(create_actividad_dto_1.CreateActividadDto) {
}
exports.UpdateActividadDto = UpdateActividadDto;
//# sourceMappingURL=update-actividad.dto.js.map