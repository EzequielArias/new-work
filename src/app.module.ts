import { Global, Module } from '@nestjs/common';
import { RolModule } from './rol/rol.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { FollowerModule } from './follower/follower.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';
import { MulterModule } from '@nestjs/platform-express';
import { AcademicModule } from './academic/academic.module';
import { WorkexperienceModule } from './workexperience/workexperience.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Global()
@Module({
  imports: [
    PrismaModule,
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RolModule,
    CloudinaryModule,
    FollowerModule,
    PostsModule,
    CommentModule,
    MulterModule,
    AcademicModule,
    WorkexperienceModule,
    CloudinaryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
