import { Body, Controller, Get, Post } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { PersonData } from './types';
import { GetCurrentUserId } from 'src/common/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('followers')
@Controller('follower')
export class FollowerController {
  constructor(private FollowerService: FollowerService) {}

  @Post('follow')
  follow(
    @Body() personData: PersonData,
    @GetCurrentUserId() userId: string,
  ): void {
    this.FollowerService.follow(userId, personData.id);
  }

  @Post('unfollow')
  unfollow(
    @Body() personData: PersonData,
    @GetCurrentUserId() userId: string,
  ): void {
    this.FollowerService.unfollow(personData.id);
  }

  @Post('get-followers')
  getAllFollowers(@GetCurrentUserId() currentUserId: string) {
    return this.FollowerService.getAllFollowers(currentUserId);
  }

  @Post('get-following')
  getAllFollowing(@GetCurrentUserId() currentUserId: string) {
    return this.FollowerService.getAllFollowing(currentUserId);
  }

  @Get('get-data-followers')
  getFollowersData(@GetCurrentUserId() currentUserId: string) {
    return this.FollowerService.getFollowersData(currentUserId);
  }

  @Get('get-data-following')
  getFollowingData(@GetCurrentUserId() currenUserId: string) {
    return this.FollowerService.getFollowingData(currenUserId);
  }
}
