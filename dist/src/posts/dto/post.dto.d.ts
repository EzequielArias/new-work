/// <reference types="multer" />
export declare class PostDto {
    images: Express.Multer.File;
    description: string;
}
export declare class EditPostDto {
    postId: string;
    images: string;
    description: string;
}
