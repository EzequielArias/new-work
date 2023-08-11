/// <reference types="multer" />
import { AccountDto, AccountSignInDto } from './dto';
import { AccountService } from './account.service';
import { Token, currentUser } from './types';
export declare class AccountController {
    private account;
    constructor(account: AccountService);
    signup(dto: AccountDto, file: Express.Multer.File): Promise<import("../interfaces/custom.response").ResponseData<string | {
        tokens: Token;
        currentUser: currentUser;
    }>>;
    signin(dto: AccountSignInDto): Promise<import("../interfaces/custom.response").ResponseData<string | {
        tokens: Token;
        currentUser: currentUser;
    }>>;
    logout(userId: string): void;
    verifyAccount(userId: string): Promise<void>;
}
