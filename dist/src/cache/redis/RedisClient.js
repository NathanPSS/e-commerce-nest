"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = require("ioredis");
class RedisClient {
    constructor(client = new ioredis_1.default({
        host: "0.0.0.0",
        port: 6379
    })) {
        this.client = client;
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=RedisClient.js.map