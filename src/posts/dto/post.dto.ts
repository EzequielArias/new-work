import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max } from 'class-validator';

export class PostDto {
  @ApiProperty()
  images: Express.Multer.File;

  @ApiProperty()
  description: string;
}

export class EditPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postId: string;
  @ApiProperty()
  @IsString()
  images: string;
  @ApiProperty()
  @IsString()
  @Max(250)
  description: string;
}
