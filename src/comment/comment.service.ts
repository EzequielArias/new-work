import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto';
import { CommentShape } from './types';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async uploadComment(currentUserId: string, postId: string, dto: CommentDto) {
    try {
      if (!currentUserId || !postId) throw new Error('Credentials invalid');

      await this.prisma.comment.create({
        data: {
          postsId: postId,
          accountId: currentUserId,
          text: dto.text,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async editComment(currentUserId: string, commentId: string, dto: CommentDto) {
    try {
      const comment = await this.getCommentById(currentUserId);

      if (comment.accountId !== currentUserId)
        throw new Error('Credentials invalid');

      await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          text: dto.text,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentById(commentId: string): Promise<CommentShape> {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    return comment;
  }

  async removeComment(currentUserId: string, commentId: string) {
    try {
      const comment = await this.getCommentById(currentUserId);

      if (comment.accountId !== currentUserId)
        throw new Error('Credentials invalid');

      await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          isDeleted: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getPostComment(postId: string, limit: string, offset: string) {
    try {
      const sqlCommand = `SELECT * FROM Comment 
            WHERE isDeleted = false AND postsId = ${postId} 
            OFFSET ${offset} LIMIT ${limit}`;

      const comments = await this.prisma.$queryRaw`${sqlCommand}`;

      return comments;
    } catch (error) {
      console.log(error);
    }
  }
}
