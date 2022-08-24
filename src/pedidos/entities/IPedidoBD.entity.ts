import { ProdutoBD } from "src/produtos/entities/IProduto.entity"

export interface IPedidoBD {
    id: number
    clientID: number
    createdAt: Date
    updateAt: Date
    produtos: ProdutoBD[]
}
