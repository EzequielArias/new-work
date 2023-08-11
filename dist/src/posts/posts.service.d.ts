import { PrismaService } from '../prisma/prisma.service';
import { EditPostDto, PostDto } from './dto';
import { FirebaseService } from '../firebase/firebase.service';
export declare class PostsService {
    private prisma;
    private firebase;
    constructor(prisma: PrismaService, firebase: FirebaseService);
    getPosts(offset: number, limit: number): Promise<unknown>;
    getPostById(postId: string): Promise<import(".prisma/client").Posts>;
    uploadPost(userId: string, dto: PostDto): Promise<boolean>;
    editPost(userId: string, dto: EditPostDto, postId: string): Promise<boolean>;
    removePost(userId: string, postId: string): Promise<void>;
}