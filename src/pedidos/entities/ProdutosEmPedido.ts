import { ApiProperty } from "@nestjs/swagger"

export class ProdutosEmPedidos {
    @ApiProperty()
    id_pedido: number
    @ApiProperty()
    id_produto:string
    @ApiProperty()
    quantidadeEmPedido:number
}