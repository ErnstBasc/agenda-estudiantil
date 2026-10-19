"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMateriaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_materia_dto_1 = require("./create-materia.dto");
class UpdateMateriaDto extends (0, swagger_1.PartialType)(create_materia_dto_1.CreateMateriaDto) {
}
exports.UpdateMateriaDto = UpdateMateriaDto;
//# sourceMappingURL=update-materia.dto.js.map