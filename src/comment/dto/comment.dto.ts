import { IsNotEmpty, IsString, IsUUID, Max } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  @Max(250)
  text: string;
}

export class editCommentDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Max(250)
  text: string;
}
