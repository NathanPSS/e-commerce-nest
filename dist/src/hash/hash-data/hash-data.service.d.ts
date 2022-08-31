/// <reference types="node" />
export declare class HashDataService {
    hashData(data: string | Buffer, salt: string | number): Promise<string>;
}
