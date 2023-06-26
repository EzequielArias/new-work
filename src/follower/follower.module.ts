import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService, PrismaService]
})
export class FollowerModule {}
