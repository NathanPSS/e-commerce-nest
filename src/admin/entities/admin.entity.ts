import { ApiProperty } from "@nestjs/swagger"

export class AdminBD {
    @ApiProperty()
    id: number
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    endereco: string
    @ApiProperty()
    telefone: string
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updateAt: Date
}
