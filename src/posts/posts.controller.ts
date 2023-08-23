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
  UploadedFile,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from '../common/decorators';
import { PostDto, EditPostDto } from './dto';
import { PostsService } from './posts.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(private posts: PostsService){}

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
  @UseInterceptors(FileInterceptor('file', {
    storage : diskStorage({
      destination : './uploads',
      filename : (req, file, cb) => {
        let uid : string = uuidv4()
        cb(null, `${uid}.${file.originalname.split('.')[1]}`)
      }
    })
  }))
  uploadPost(
  @GetCurrentUserId() userId: string, 
  @Body() dto: PostDto,
  @UploadedFile() file : Express.Multer.File[]) {
    console.log(file)
    //this.posts.uploadPost(userId, dto);
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
