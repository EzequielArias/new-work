/// <reference types="multer" />
import { PostDto, EditPostDto } from './dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private posts;
    constructor(posts: PostsService);
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
    uploadPost(userId: string, files: Array<Express.Multer.File>, dto: PostDto): Promise<import(".prisma/client").Posts & {
        images: {
            url: string;
        }[];
    }>;
    editPost(userId: string, dto: EditPostDto, postId: string): void;
}
