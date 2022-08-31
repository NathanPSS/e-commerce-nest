import { Strategy } from "passport-local";
import { ClientesService } from "../../clientes.service";
import { ExceptionService } from "../../../exceptions/bad-request-exception/exception.service";
import { CompareHashDataService } from "../../../hash/compare-hash-data/compare-hash-data.service";
declare const LocalClienteStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalClienteStrategy extends LocalClienteStrategy_base {
    private clientsService;
    private hash;
    private exceptions;
    constructor(clientsService: ClientesService, hash: CompareHashDataService, exceptions: ExceptionService);
    validate(username: string, password: string): Promise<any>;
    private checkPassword;
}
export {};
