import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
export declare class RolService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    getAllRol(): Promise<import(".prisma/client").Type_rol[]>;
    addRol(rol: string): Promise<import(".prisma/client").Type_rol>;
    setRolToAccount(AccountId: string): Promise<void>;
    deleteRol(rolId: string): Promise<string>;
}
