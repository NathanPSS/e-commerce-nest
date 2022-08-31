import { ProdutosEmPedidos } from "./ProdutosEmPedido";
export declare class IPedidoBD {
    id: number;
    clientID: number;
    createdAt: Date;
    updateAt: Date;
    produtos: Array<ProdutosEmPedidos>;
}
