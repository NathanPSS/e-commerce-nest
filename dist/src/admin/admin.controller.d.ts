import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminBD } from './entities/admin.entity';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<AdminBD>;
    update(req: any, updateAdminDto: UpdateAdminDto): Promise<AdminBD>;
    remove(req: any): Promise<AdminBD>;
}
