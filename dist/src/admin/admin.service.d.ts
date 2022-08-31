import { PostgreSqlService } from '../clients/postgree-service/postgree-service.service';
import { ExceptionService } from '../exceptions/bad-request-exception/exception.service';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminBD } from './entities/admin.entity';
export declare class AdminService {
    private readonly BD;
    private readonly encrypt;
    private readonly execptions;
    constructor(BD: PostgreSqlService, encrypt: HashDataService, execptions: ExceptionService);
    create(createAdminDto: CreateAdminDto): Promise<AdminBD>;
    findAll(): string;
    findOne(username: string): Promise<AdminBD>;
    findOneById(id: number): Promise<AdminBD | void>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<AdminBD>;
    remove(id: number): Promise<AdminBD>;
}
