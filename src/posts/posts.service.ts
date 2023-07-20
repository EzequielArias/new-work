import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditPostDto, PostDto } from './dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

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

      const post = await this.prisma.posts.create({
        data: {
          images: '',
          description: dto.description,
          accountId: userId,
        },
      });

      const url = await this.firebase.uploadFiles(dto.images, post.id, true);

      await this.prisma.posts.update({
        where: {
          id: post.id,
        },
        data: {
          images: url,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async editPost(userId: string, dto: EditPostDto, postId : string) {
    try {
      const oldPost = await this.prisma.posts.findUnique({
        where: {
          id: postId,
        },
      });

      if (userId !== oldPost.accountId) throw new Error('Credentials invalid');

      let img: any;
      if (dto.images) {
        await this.firebase.removeFile(oldPost.id, true);
        img = await this.firebase.uploadFiles(dto.images, oldPost.id, true);
      }

      await this.prisma.posts.update({
        where: {
          id: dto.postId,
        },
        data: {
          images: dto.images ? img : oldPost.images,
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
