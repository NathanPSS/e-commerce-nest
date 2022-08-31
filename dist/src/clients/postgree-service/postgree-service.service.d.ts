import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export declare class PostgreSqlService extends PrismaClient {
    constructor(config: ConfigService);
}
