import { Global, Module } from '@nestjs/common';
import { RolModule } from './rol/rol.module';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { FollowerModule } from './follower/follower.module';
import { PostsModule } from './posts/posts.module';

@Global()
@Module({
  imports: [
    RolModule,
    AccountModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FollowerModule,
    PostsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
