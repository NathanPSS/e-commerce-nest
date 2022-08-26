import { ApiProperty } from "@nestjs/swagger"
import { ProdutoBD } from "src/produtos/entities/IProduto.entity"

export class IPedidoBD {
    @ApiProperty()
    id: number
    @ApiProperty()
    clientID: number
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updateAt: Date
    @ApiProperty()
    produtos: Array<{}>
}
