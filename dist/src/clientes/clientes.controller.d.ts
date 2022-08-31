import { Response } from 'express';
import { PedidosService } from '../pedidos/pedidos.service';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateProdutoCacheDto } from '../produtos/dto/create-produto-cache.dto';
import { ProdutosService } from '../produtos/produtos.service';
import { LoginClienteDto } from './dto/login-cliente.dto';
import { IClientBD } from './entities/iClientBD.entity';
import { CodigoPedidoDto } from '../pedidos/dto/CodigoPedidoDto';
export declare class ClientesController {
    private readonly clientesService;
    private readonly pedidosService;
    private readonly produtosService;
    constructor(clientesService: ClientesService, pedidosService: PedidosService, produtosService: ProdutosService);
    create(createClienteDto: CreateClienteDto): Promise<void>;
    renderCadastro(res: Response): void;
    renderLogin(res: Response): void;
    login(loginClienteDto: LoginClienteDto): void;
    renderDashborad(req: any, res: Response): Promise<void>;
    renderClienteAtualiza(res: Response, req: any): Promise<void>;
    update(updateClienteDto: UpdateClienteDto, req: any): Promise<IClientBD>;
    remove(req: any): Promise<IClientBD>;
    pedidosRender(res: Response, req: any): Promise<void>;
    pedidosCache(createProdutoDto: CreateProdutoCacheDto, req: any): Promise<void>;
    fazerPedidos(req: any): Promise<void>;
    deletarPedidos(idProduto: CodigoPedidoDto): Promise<void | import(".prisma/client").pedido>;
}
