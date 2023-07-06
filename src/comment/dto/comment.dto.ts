import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Max } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Max(250)
  text: string;
}

export class editCommentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Max(250)
  text: string;
}
