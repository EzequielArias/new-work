import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetCurrentUserId } from '../common/decorators';
import { CommentDto, editCommentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private comment: CommentService) {}

  @Get('get')
  @HttpCode(HttpStatus.OK)
  getPostComment(
    @Body() postId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    return this.comment.getPostComment(postId, limit, offset);
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  uploadComment(
    @GetCurrentUserId() currentUserId: string,
    @Body() postId: string,
    @Body() dto: CommentDto,
  ) {
    return this.comment.uploadComment(currentUserId, postId, dto);
  }

  @Put('edit/:id')
  @HttpCode(HttpStatus.OK)
  editComment(
    @GetCurrentUserId() currentUserId: string,
    @Body() edit: editCommentDto,
  ) {
    return this.comment.editComment(currentUserId, edit.id, edit);
  }

  @Put('remove')
  @HttpCode(HttpStatus.OK)
  removeComment(
    @GetCurrentUserId() currentUserId: string,
    @Body() commentId: string,
  ) {
    return this.comment.removeComment(currentUserId, commentId);
  }
}
