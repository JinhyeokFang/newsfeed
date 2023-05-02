import { IsNumber, IsString } from 'class-validator';

export class LikePostBody {
  @IsNumber()
  postId: number;

  @IsString()
  userId: string;
}
