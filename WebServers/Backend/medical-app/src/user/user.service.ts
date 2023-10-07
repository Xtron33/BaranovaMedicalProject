import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (isExist) throw new BadRequestException('This email already exist!');

    const user = await this.userRepository.save({
      email: createUserDto.email,
      login: createUserDto.login,
      password: await hash(createUserDto.password, 13),
      role: 'user',
    });

    return { user };
  }
  async createAdmin(createUserDto: CreateUserDto) {
    const isExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (isExist) throw new BadRequestException('This email already exist!');

    const user = await this.userRepository.save({
      email: createUserDto.email,
      login: createUserDto.login,
      password: await hash(createUserDto.password, 13),
      role: createUserDto.role,
    });

    return { user };
  }

  async findOne(login: string) {
    const userEmail = await this.userRepository.findOne({
      where: { email: login },
    });
    if (!userEmail) throw new NotFoundException('User not found');

    return userEmail;
  }
}
