import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPostDto, PostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(offset: number, limit: number) {
    try {
      const SqlQuery = `SELECT * FROM Posts OFFSET ${offset} LIMIT ${limit};`;

      const result = await this.prisma.$queryRaw`${SqlQuery}`;

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getPostById(postId: string) {
    try {
      const result = await this.prisma.posts.findUnique({
        where: {
          id: postId,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadPost(userId: string, dto: PostDto) {
    try {
      const user = await this.prisma.account.findUnique({
        where: { id: userId },
      });

      if (!user) throw new Error('Credentials invalid');

      await this.prisma.posts.create({
        data: {
          images: dto.images,
          description: dto.description,
          accountId: userId,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async editPost(userId: string, dto: EditPostDto) {
    try {
      const oldPost = await this.prisma.posts.findUnique({
        where: {
          id: dto.postId,
        },
      });

      if (userId !== oldPost.accountId) throw new Error('Credentials invalid');

      await this.prisma.posts.update({
        where: {
          id: dto.postId,
        },
        data: {
          images: dto.images ? dto.images : oldPost.images,
          description: dto.description ? dto.description : oldPost.description,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async removePost(userId: string, postId: string) {
    const selectedPost = await this.prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });

    if (userId !== selectedPost.accountId)
      throw new Error('Credentials invalid');

    await this.prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
