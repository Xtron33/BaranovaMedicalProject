import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await compare(password, user.password);
    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException();
  }
  async login(user: IUser) {
    const { id, email, role } = user;
    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
      id,
      email,
      role,
    };
  }
}
