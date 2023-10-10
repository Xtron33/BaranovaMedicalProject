import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  login: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  @IsOptional()
  password: string;
  role: string;
}
