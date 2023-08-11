import { CommentService } from './comment.service';
import { CommentDto, editCommentDto } from './dto';
export declare class CommentController {
    private comment;
    constructor(comment: CommentService);
    getPostComment(postId: string, offset: string, limit: string): Promise<import("../interfaces/custom.response").ResponseData<string | import("./types").CommentShape>>;
    uploadComment(currentUserId: string, postId: string, dto: CommentDto): Promise<import("../interfaces/custom.response").ResponseData<any>>;
    editComment(currentUserId: string, edit: editCommentDto): Promise<import("../interfaces/custom.response").ResponseData<any>>;
    removeComment(currentUserId: string, commentId: string): Promise<import("../interfaces/custom.response").ResponseData<any>>;
}
