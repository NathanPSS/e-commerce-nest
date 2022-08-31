import { CreateAdminDto } from './create-admin.dto';
declare const UpdateAdminDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAdminDto>>;
export declare class UpdateAdminDto extends UpdateAdminDto_base {
    nome?: string;
    username?: string;
    password?: string;
    endereco?: string;
    telefone?: string;
}
export {};
