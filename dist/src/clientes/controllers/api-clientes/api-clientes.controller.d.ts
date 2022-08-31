import { ClientesService } from '../../clientes.service';
import { CreateClienteDto } from '../../dto/create-cliente.dto';
import { UpdateClienteDto } from '../../dto/update-cliente.dto';
import { IClientBD } from '../../entities/iClientBD.entity';
export declare class ApiClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(createClienteDto: CreateClienteDto): Promise<IClientBD>;
    findById(id: number): Promise<IClientBD | void>;
    findAll(): Promise<Array<IClientBD>>;
    delete(id: number): Promise<IClientBD>;
    update(id: number, updateCliente: UpdateClienteDto): Promise<IClientBD>;
}
