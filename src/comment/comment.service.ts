import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentDto } from './dto';
import { CommentShape } from './types';
import { CustomErr } from 'src/utils/errors/custom.errors';
import { ResponseData } from 'src/interfaces/custom.response';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async uploadComment(currentUserId: string, postId: string, dto: CommentDto) : Promise<ResponseData<any>>{
    try {
      if (!currentUserId || !postId) throw new Error('Credentials invalid');

      await this.prisma.comment.create({
        data: {
          postsId: postId,
          accountId: currentUserId,
          text: dto.text,
        },
      });

      return {
        ok :true,
        statusCode : 200,
        payload : 'comentario agregado'
      }
    } catch (err) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }

  async editComment(currentUserId: string, commentId: string, dto: CommentDto) : Promise<ResponseData<any>> {
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

      return {
        ok : true,
        statusCode : 200,
        payload : 'comentario editado'
      }
    } catch (err) {
      const res = new CustomErr()
      return res.nestErr(err)
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

  async removeComment(currentUserId: string, commentId: string) : Promise<ResponseData<any>>{
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

      return {
        ok : true,
        statusCode : 200,
        payload : 'comment removed'
      }

    } catch (err) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }

  async getPostComment(postId: string, limit: string, offset: string) : Promise<ResponseData<CommentShape | string>>{
    try {
      const sqlCommand = `SELECT * FROM Comment 
            WHERE isDeleted = false AND postsId = ${postId} 
            OFFSET ${offset} LIMIT ${limit}`;

      const comments : CommentShape = await this.prisma.$queryRaw`${sqlCommand}`;

      return {
        ok : true,
        statusCode : 200,
        payload : comments
      };
    } catch (err) {
      const res = new CustomErr()
      return res.nestErr(err)
    }
  }
}
