import { ApiProperty } from "@nestjs/swagger"

export class IClientBD {
@ApiProperty()
    id: number
     @ApiProperty()   
    email: string
@ApiProperty()
    nome: string
    @ApiProperty()
    password: string
@ApiProperty()
    telefone: string
@ApiProperty()
    createdAt: Date
@ApiProperty()
    updateAt: Date

}