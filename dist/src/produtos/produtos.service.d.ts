import { CacheGetService } from '../cache/cache-get/cache-get.service';
import { CacheNormalizeService } from '../cache/cache-normalize/cache-normalize.service';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service';
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';
import { CreateProdutoApiDto } from './dto/create-api-produto.dto';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateApiProdutoDto } from './dto/update-api-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoBD } from './entities/IProduto.entity';
export declare class ProdutosService {
    private readonly BD;
    private readonly execptions;
    private readonly cacheGet;
    private readonly cacheNormalize;
    constructor(BD: PostgreSqlService, execptions: ExceptionService, cacheGet: CacheGetService, cacheNormalize: CacheNormalizeService);
    createByApp(createProdutoDto: CreateProdutoDto): Promise<ProdutoBD>;
    createByAPI(creteProdutoApi: CreateProdutoApiDto): Promise<ProdutoBD>;
    findAll(): Promise<ProdutoBD[]>;
    findOne(codigo: string): Promise<ProdutoBD>;
    update(updateProdutoDto: UpdateProdutoDto): Promise<ProdutoBD>;
    updateByApi(codigo: string, updateProdutoDto: UpdateApiProdutoDto): Promise<ProdutoBD>;
    remove(codigo: string): Promise<ProdutoBD | void>;
    retireToCache(id: string): Promise<{
        total: number;
        produtos: object[];
    }>;
}
