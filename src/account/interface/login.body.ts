import { IsEmail, IsString } from 'class-validator';

export class LoginBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
