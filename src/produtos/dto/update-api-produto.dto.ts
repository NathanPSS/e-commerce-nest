import { PartialType } from "@nestjs/swagger";
import { CreateProdutoApiDto } from "./create-api-produto.dto";

export class UpdateApiProdutoDto extends PartialType(CreateProdutoApiDto){
}