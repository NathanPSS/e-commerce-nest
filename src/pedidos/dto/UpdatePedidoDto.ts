import { PartialType } from "@nestjs/swagger";
import { CreatePedidoApiDto } from "./CreatePedidoDto";

export class UpdatePedidoApiDto extends PartialType(CreatePedidoApiDto){
    
}