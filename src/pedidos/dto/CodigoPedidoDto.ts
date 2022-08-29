import { ApiAcceptedResponse, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { ApiPropertyOptions } from "@nestjs/swagger";

export class CodigoPedidoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    id:string
    /**
     * name
     */
    public name() {
        let g :ApiPropertyOptions
        
    }
}