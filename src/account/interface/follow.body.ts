import { IsString } from 'class-validator';

export class FollowBody {
  @IsString()
  follower: string;

  @IsString()
  following: string;
}
