"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApiProdutoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_api_produto_dto_1 = require("./create-api-produto.dto");
class UpdateApiProdutoDto extends (0, swagger_1.PartialType)(create_api_produto_dto_1.CreateProdutoApiDto) {
}
exports.UpdateApiProdutoDto = UpdateApiProdutoDto;
//# sourceMappingURL=update-api-produto.dto.js.map