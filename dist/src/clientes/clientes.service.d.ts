import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service';
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { IClientBD } from './entities/iClientBD.entity';
export declare class ClientesService {
    private BD;
    private encrypt;
    private execeptions;
    constructor(BD: PostgreSqlService, encrypt: HashDataService, execeptions: ExceptionService);
    create(createClienteDto: CreateClienteDto): Promise<IClientBD>;
    findAll(): Promise<IClientBD[]>;
    findOneById(id: number): Promise<IClientBD | void>;
    findOneByEmail(email: string): Promise<IClientBD | null>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<IClientBD>;
    remove(id: number): Promise<IClientBD>;
}
