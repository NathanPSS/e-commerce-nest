import { ApiProperty } from "@nestjs/swagger"

export class ProdutoBD {
    @ApiProperty()
    codigo: string
    @ApiProperty()
    quantidade: number 
    @ApiProperty()
    nome: string
    @ApiProperty()
    preco: number
    @ApiProperty()
    descricao: string
    @ApiProperty()
    tipo: String
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updateAt: Date
}
export class ProdutoId {
    codigo
}