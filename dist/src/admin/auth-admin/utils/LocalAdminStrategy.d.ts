import { Strategy } from "passport-local";
import { AdminService } from "../../admin.service";
import { ExceptionService } from "../../../exceptions/bad-request-exception/exception.service";
import { CompareHashDataService } from "../../../hash/compare-hash-data/compare-hash-data.service";
declare const LocalAdminStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalAdminStrategy extends LocalAdminStrategy_base {
    private adminService;
    private hash;
    private exceptions;
    constructor(adminService: AdminService, hash: CompareHashDataService, exceptions: ExceptionService);
    validate(username: string, password: string): Promise<any>;
    private checkPassword;
}
export {};
