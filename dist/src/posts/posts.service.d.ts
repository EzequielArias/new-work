import { PrismaService } from '../prisma/prisma.service';
import { EditPostDto, PostDto } from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class PostsService {
    private prisma;
    private cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    getPosts(offset: number, limit: number): Promise<(import(".prisma/client").Posts & {
        account: {
            id: string;
            name: string;
            image: string;
        };
        images: {
            url: string;
        }[];
    })[]>;
    getPostById(postId: string): Promise<import(".prisma/client").Posts>;
    uploadPost(userId: string, dto: PostDto): Promise<import(".prisma/client").Posts & {
        images: {
            url: string;
        }[];
    }>;
    editPost(userId: string, dto: EditPostDto, postId: string): Promise<void>;
    removePost(userId: string, postId: string): Promise<void>;
}
