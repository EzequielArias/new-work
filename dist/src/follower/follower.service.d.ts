import { PrismaService } from '../prisma/prisma.service';
import { ResponseData } from 'src/interfaces/custom.response';
export declare class FollowerService {
    private prisma;
    constructor(prisma: PrismaService);
    follow(currentUserId: string, personId: string): Promise<ResponseData<string>>;
    unfollow(currentUserId: string, personId: string): Promise<ResponseData<string>>;
    getFollowersData(currentUserId: string): Promise<ResponseData<any | string>>;
}
