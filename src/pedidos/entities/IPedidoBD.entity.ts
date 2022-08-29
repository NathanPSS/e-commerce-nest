import { ApiProperty } from "@nestjs/swagger"
import { CreateProdutoCacheDto } from "src/produtos/dto/create-produto-cache.dto"
import { ProdutoBD } from "src/produtos/entities/IProduto.entity"
import { ProdutosEmPedidos } from "./ProdutosEmPedido"

export class IPedidoBD {
    @ApiProperty()
    id: number
    @ApiProperty()
    clientID: number
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    updateAt: Date
    @ApiProperty({type: ProdutosEmPedidos,isArray: true})
    produtos: Array<ProdutosEmPedidos>
}
