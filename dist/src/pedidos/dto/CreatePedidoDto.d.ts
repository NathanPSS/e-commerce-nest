import { CreateProdutoCacheDto } from "../../produtos/dto/create-produto-cache.dto";
export declare class CreatePedidoApiDto {
    clientID: number;
    produtos: Array<CreateProdutoCacheDto>;
}
