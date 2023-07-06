import {
  Controller,
  Body,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Post,
  Param,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { PostDto, EditPostDto } from './dto';
import { PostsService } from './posts.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private posts: PostsService) {}

  @Public()
  @Get('get')
  @HttpCode(HttpStatus.OK)
  getPosts(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.posts.getPosts(offset, limit);
  }

  @ApiParam({
    name : 'id'
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getPostById(@Param('id') postId: string) {
    return this.posts.getPostById(postId);
  }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  uploadPost(@GetCurrentUserId() userId: string, @Body() dto: PostDto) {
    this.posts.uploadPost(userId, dto);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  editPost(@GetCurrentUserId() userId: string, @Body() dto: EditPostDto) {
    this.posts.editPost(userId, dto);
  }
}
