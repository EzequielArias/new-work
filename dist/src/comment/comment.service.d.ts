import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto';
import { CommentShape } from './types';
import { ResponseData } from 'src/interfaces/custom.response';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadComment(currentUserId: string, postId: string, dto: CommentDto): Promise<ResponseData<any>>;
    editComment(currentUserId: string, commentId: string, dto: CommentDto): Promise<ResponseData<any>>;
    getCommentById(commentId: string): Promise<CommentShape>;
    removeComment(currentUserId: string, commentId: string): Promise<ResponseData<any>>;
    getPostComment(postId: string, limit: string, offset: string): Promise<ResponseData<CommentShape | string>>;
}
