import Redis from "ioredis";
export declare class RedisClient {
    protected readonly client: Redis;
    constructor(client?: Redis);
}
