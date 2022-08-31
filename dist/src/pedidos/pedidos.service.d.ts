import { CacheDelService } from '../cache/cache-del/cache-del.service';
import { CacheGetService } from '../cache/cache-get/cache-get.service';
import { CacheNormalizeService } from '../cache/cache-normalize/cache-normalize.service';
import { CacheSetService } from '../cache/cache-set/cache-set.service';
import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service';
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';
import { CreateProdutoCacheDto } from 'src/produtos/dto/create-produto-cache.dto';
import ValidateProduto from '../produtos/validators/ValidateProduto.service';
import { CreatePedidoApiDto } from './dto/CreatePedidoDto';
import { UpdatePedidoApiDto } from './dto/UpdatePedidoDto';
export declare class PedidosService {
    private readonly BD;
    private readonly cacheSet;
    private readonly cacheGet;
    private readonly cacheNormalize;
    private readonly cacheDelete;
    private readonly validateProduto;
    private readonly execptions;
    constructor(BD: PostgreSqlService, cacheSet: CacheSetService, cacheGet: CacheGetService, cacheNormalize: CacheNormalizeService, cacheDelete: CacheDelService, validateProduto: ValidateProduto, execptions: ExceptionService);
    createByCache(id: string): Promise<void>;
    createByApi(createPedidoApiDto: CreatePedidoApiDto): Promise<void | {
        pedido: import(".prisma/client").pedido;
        produtos: object[];
    }>;
    createCache(id: string, produto: CreateProdutoCacheDto): Promise<void>;
    findAll(): Promise<import(".prisma/client").pedido[]>;
    findAllByIdCliente(id: string): Promise<object[]>;
    findById(id: number): Promise<void | import(".prisma/client").pedido>;
    remove(id: string): Promise<void | import(".prisma/client").pedido>;
    updatePedidoByApi(id: number, updatePedidoDto: UpdatePedidoApiDto): Promise<void | import(".prisma/client").pedido>;
}
