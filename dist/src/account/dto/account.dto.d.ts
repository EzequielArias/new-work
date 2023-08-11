/// <reference types="multer" />
export declare class AccountDto {
    name: string;
    image?: Express.Multer.File;
    email: string;
    Type_rol_id?: string;
    password: string;
}
