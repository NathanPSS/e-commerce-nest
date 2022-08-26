import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CodigoPedidoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    id:string
}