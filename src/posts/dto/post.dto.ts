import { IsNotEmpty, IsString, Max } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  images: string;

  @IsString()
  @IsNotEmpty()
  @Max(250)
  description: string;
}

export class EditPostDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  images: string;

  @IsString()
  @Max(250)
  description: string;
}
