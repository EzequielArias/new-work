import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService, PrismaService],
})
export class FollowerModule {}
