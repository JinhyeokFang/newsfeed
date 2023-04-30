import { IsString } from 'class-validator';

export class CreatePostBody {
  @IsString()
  authorId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
