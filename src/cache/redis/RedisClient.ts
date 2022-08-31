import Redis from "ioredis";

export class RedisClient {
    constructor(
        protected readonly client = new Redis({
            host: "0.0.0.0",
            port: 6379
        }
    )){}
}