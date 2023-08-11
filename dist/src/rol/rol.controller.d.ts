import { rolDto } from './dto';
import { RolService } from './rol.service';
export declare class RolController {
    private rol;
    constructor(rol: RolService);
    addRol(dto: rolDto): Promise<import(".prisma/client").Type_rol>;
    getAllRoles(): Promise<import(".prisma/client").Type_rol[]>;
    setRolToAccount(accountId: string): any;
    deleteRol(rolId: string): String | Error;
}
