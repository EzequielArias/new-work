import {
  Controller,
  Body,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Put,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from '../common/decorators';
import { PostDto, EditPostDto } from './dto';
import { PostsService } from './posts.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

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
    name: 'id',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getPostById(@Param('id') postId: string) {
    return this.posts.getPostById(postId);
  }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, cb) => {
          let uid: string = uuidv4();
          cb(null, `${uid}.${file.originalname.split('.')[1]}`);
        },
      }),
    }),
  )
  uploadPost(
    @GetCurrentUserId() userId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto : PostDto
  ) {
    if(files) dto.images = files
    return this.posts.uploadPost(userId, dto);
  }

  @Put('edit/:id')
  @HttpCode(HttpStatus.OK)
  editPost(
    @GetCurrentUserId() userId: string,
    @Body() dto: EditPostDto,
    @Param('id') postId: string,
  ) {
    this.posts.editPost(userId, dto, postId);
  }
}
