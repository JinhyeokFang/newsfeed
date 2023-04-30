import { IsString } from 'class-validator';

export class UnfollowBody {
  @IsString()
  follower: string;

  @IsString()
  following: string;
}
