import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
export declare type Context = {
    prisma: PrismaClient;
};
export declare type MockContext = {
    prisma: DeepMockProxy<PrismaClient>;
};
export declare const createMockContext: () => MockContext;
