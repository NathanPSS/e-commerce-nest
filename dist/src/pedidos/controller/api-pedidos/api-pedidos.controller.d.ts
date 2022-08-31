import { CreatePedidoApiDto } from '../../dto/CreatePedidoDto';
import { UpdatePedidoApiDto } from '../../dto/UpdatePedidoDto';
import { PedidosService } from '../../pedidos.service';
export declare class ApiPedidosController {
    private pedidosService;
    constructor(pedidosService: PedidosService);
    create(dto: CreatePedidoApiDto): Promise<void | {
        pedido: import(".prisma/client").pedido;
        produtos: object[];
    }>;
    findAll(): Promise<import(".prisma/client").pedido[]>;
    findById(id: number): Promise<void | import(".prisma/client").pedido>;
    delete(id: string): Promise<void | import(".prisma/client").pedido>;
    update(id: number, dto: UpdatePedidoApiDto): Promise<void | import(".prisma/client").pedido>;
}
