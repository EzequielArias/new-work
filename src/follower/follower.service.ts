import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}

  async follow(currentUserId: string, personId: string) {
    try {
      // Follow the person selected.
      await this.prisma.follower.create({
        data: {
          follower_id: currentUserId,
          following_id: personId,
        },
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async unfollow(currentUserId: string, personId: string) {
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

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async getFollowersData(currentUserId: string) {
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
        followers,
        following,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
