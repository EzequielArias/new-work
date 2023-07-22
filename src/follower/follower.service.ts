import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseData } from 'src/interfaces/custom.response';
import { CustomErr } from 'src/utils';
import { PersonData } from './types';

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}

  async follow(currentUserId: string, personId: string) : Promise<ResponseData<string>> {
    try {
      // Follow the person selected.
      await this.prisma.follower.create({
        data: {
          follower_id: currentUserId,
          following_id: personId,
        },
      });

      return {
        ok : true,
        statusCode : 200,
        payload : 'Follower'
      }
    } catch (err) {
      const res = new CustomErr();
      return res.nestErr(err)
    }
  }

  async unfollow(currentUserId: string, personId: string) : Promise<ResponseData<string>>{
    // We browse de record of a person to delete for unfollow.
    try {
      await this.prisma.follower.delete({
        where: {
          follower_id_following_id: {
            follower_id: currentUserId,
            following_id: personId,
          },
        },
      });

      return {
        ok : true,
        statusCode : 200,
        payload : 'unfollow'
      }
    } catch (err) {
      const res = new CustomErr();
      return res.nestErr(err)
    }
  }

  async getFollowersData(currentUserId: string) : Promise<ResponseData<any| string>>{
    try {
      const followers = await this.prisma.follower.findMany({
        where: {
          follower_id: currentUserId,
        },
        include: {
          FollowerId: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      });

      const following = await this.prisma.follower.findMany({
        where: {
          following_id: currentUserId,
        },
        include: {
          FollowingId: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      });

      return {
        ok : true,
        statusCode : 200,
        payload : {
          followers,
          following,
        }
      }
    } catch (err) {
      const res = new CustomErr();
      return res.nestErr(err)
    }
  }
}
