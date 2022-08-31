import { PostgreSqlService } from '../../clients/postgree-service/postgree-service.service';
export default class ValidateProduto {
    private readonly BD;
    constructor(BD: PostgreSqlService);
    validate(codigo: string): Promise<void>;
}
