import { IsNumber, IsString } from 'class-validator';

export class DislikePostBody {
  @IsNumber()
  postId: number;

  @IsString()
  userId: string;
}
