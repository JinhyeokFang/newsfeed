import { IsEmail, IsString } from 'class-validator';

export class RegisterBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
