import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}

  async follow(currentUserId: string, personId: string) {
    try {
      // Follow the person selected.
      await this.prisma.following.create({
        data: {
          accountId: currentUserId,
          personId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async unfollow(personId: string) {
    // We browse de record of a person to delete for unfollow.
    try {
      const record = await this.prisma.following.delete({
        where: {
          id: personId,
        },
      });

      return record;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFollowers(currentUserId: string) {
    try {
      const result = await this.prisma.follower.findMany({
        where: {
          accountId: currentUserId,
        },
      });

      return result.length;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFollowing(currentUserId: string) {
    try {
      const result = await this.prisma.following.findMany({
        where: {
          accountId: currentUserId,
        },
      });

      return result.length;
    } catch (error) {
      console.log(error);
    }
  }

  async getFollowersData(currentUserId: string) {
    try {
      const followers = await this.prisma.account.findUnique({
        where: {
          id: currentUserId,
        },
        include: {
          followers: true,
        },
      });

      const promise = await Promise.all([
        followers.followers.map((p) => {
          return this.prisma.account.findUnique({
            where: {
              id: p.personId,
            },
            select: {
              image: true,
              name: true,
              id: true,
            },
          });
        }),
      ]);
      const results = await Promise.all(promise);
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async getFollowingData(currentUserId: string) {
    try {
      const followers = await this.prisma.account.findUnique({
        where: {
          id: currentUserId,
        },
        include: {
          following: true,
        },
      });

      const promise = await Promise.all([
        followers.following.map((p) => {
          this.prisma.account.findUnique({
            where: {
              id: p.personId,
            },
            select: {
              id: true,
              image: true,
              name: true,
            },
          });
        }),
      ]);
      const results = await Promise.all(promise);
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
