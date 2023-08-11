import { PostDto, EditPostDto } from './dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private posts;
    constructor(posts: PostsService);
    getPosts(offset: number, limit: number): Promise<unknown>;
    getPostById(postId: string): Promise<import(".prisma/client").Posts>;
    uploadPost(userId: string, dto: PostDto): void;
    editPost(userId: string, dto: EditPostDto, postId: string): void;
}
