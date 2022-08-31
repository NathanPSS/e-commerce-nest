import { Context } from "src/context";
interface CreateProdutoDto {
    codigo: string;
    nome: string;
    quantidade: number;
    preco: number;
    descricao: string;
    tipo: string;
}
export declare function createProduto(produto: CreateProdutoDto, ctx: Context): Promise<void>;
export {};
