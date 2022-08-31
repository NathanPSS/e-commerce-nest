import { CreateProdutoApiDto } from '../../dto/create-api-produto.dto';
import { UpdateApiProdutoDto } from '../../dto/update-api-produto.dto';
import { ProdutoBD } from '../../entities/IProduto.entity';
import { ProdutosService } from '../../produtos.service';
export declare class ApiProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutosService);
    create(createProdutoDto: CreateProdutoApiDto): Promise<ProdutoBD | void>;
    findByCodigo(codigo: string): Promise<ProdutoBD | void>;
    findAll(): Promise<Array<ProdutoBD>>;
    delete(codigo: string): Promise<void | ProdutoBD>;
    update(codigo: string, updateProdutoDto: UpdateApiProdutoDto): Promise<ProdutoBD>;
}
