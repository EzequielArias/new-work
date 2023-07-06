import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max } from 'class-validator';

export class PostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  images: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Max(250)
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
