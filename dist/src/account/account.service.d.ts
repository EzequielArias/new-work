import { PrismaService } from '../prisma/prisma.service';
import { AccountDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Token, currentUser, VerifyToken } from './types';
import { FirebaseService } from '../firebase/firebase.service';
import { ResponseData } from 'src/interfaces/custom.response';
export declare class AccountService {
    private prisma;
    private JwtService;
    private config;
    private firebase;
    constructor(prisma: PrismaService, JwtService: JwtService, config: ConfigService, firebase: FirebaseService);
    updateRt(userId: string, rt: string): Promise<void>;
    getToken(userId: string, email: string): Promise<Token>;
    verifyToken(userId: string, email: string): Promise<VerifyToken>;
    sendVerificationEmail(email: string, userId: string): Promise<void>;
    verifyAccount(userId: string): Promise<void>;
    signup(data: AccountDto): Promise<ResponseData<{
        tokens: Token;
        currentUser: currentUser;
    } | string>>;
    signin(email: string, pass: string): Promise<ResponseData<{
        tokens: Token;
        currentUser: currentUser;
    } | string>>;
    logout(userId: string): Promise<void>;
}
