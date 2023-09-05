import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditPostDto, PostDto } from './dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getPosts(offset: number, limit: number) {
    try {
      const result = await this.prisma.posts.findMany({
        take : Number(limit),
        skip : Number(offset),
        include : {
          images : {
            select : {
              url : true
            }
          },
          account : {
            select : {
              name : true,
              image : true,
              id : true
            }
          }
        }
      })

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
          description: dto.description,
          account: {
            connect: {
              id: userId,
            },
          },
        },
      });

      let fileOriginalName = dto.images.map((file) => file.filename);

      const url = await this.cloudinary.uploadFiles(fileOriginalName);
      
      if(url instanceof Array){
        for (const fileUrl of url) {
          await this.prisma.images.create({
            data : {
              url : fileUrl,
              postsId : post.id
            }
          })
        }
      }

      const result = await this.prisma.posts.findUnique({
        where : {
          id : post.id
        },
        include : {
          images : {
            select : {
              url : true 
            }
          }
        }
      })

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async editPost(userId: string, dto: EditPostDto, postId: string) {
    /*try {
      const oldPost = await this.prisma.posts.findUnique({
        where: {
          id: postId,
        },
      });

      if (userId !== oldPost.accountId) throw new Error('Credentials invalid');

     /* let img: any;
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
    }*/
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
