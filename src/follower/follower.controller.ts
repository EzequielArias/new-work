import { Body, Controller, Get, Post } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { PersonData } from './types';
import { GetCurrentUserId } from '../common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('followers')
@Controller('follower')
export class FollowerController {
  constructor(private FollowerService: FollowerService) {}

  @Post('follow')
  follow(@Body() personData: PersonData, @GetCurrentUserId() userId: string) {
    return this.FollowerService.follow(userId, personData.id);
  }

  @Post('unfollow')
  unfollow(@Body() personData: PersonData, @GetCurrentUserId() userId: string) {
    return this.FollowerService.unfollow(userId, personData.id);
  }

  @Get('get-data-followers')
  getFollowersData(@GetCurrentUserId() currentUserId: string) {
    return this.FollowerService.getFollowersData(currentUserId);
  }
}
