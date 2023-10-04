import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  login: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
  role: string;
}
