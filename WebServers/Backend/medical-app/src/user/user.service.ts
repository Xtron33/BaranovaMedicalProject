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
import { UpdateUserDto } from './dto/update-user.dto';

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
      password: await hash(createUserDto.password, 13),
      role: createUserDto.role,
    });

    return { user };
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    const data = await this.userRepository.findOne({
      where: { email },
    });
    if (!data) throw new NotFoundException('Data not found');

    return data;
  }
  async findOneId(id: number) {
    const data = await this.userRepository.findOne({
      where: { id },
    });
    if (!data) throw new NotFoundException('Data not found');

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.userRepository.findOne({
      where: { id },
    });

    if (!data) throw new NotFoundException('Data not found');
    if (updateUserDto.password === undefined) {
      return await this.userRepository.update(id, updateUserDto);
    } else {
      return await this.userRepository.update(id, {
        email: updateUserDto.email,
        password: await hash(updateUserDto.password, 13),
        role: updateUserDto.role,
      });
    }
  }

  async remove(id: number) {
    const isExist = await this.userRepository.findOne({
      where: { id },
    });
    if (!isExist) throw new NotFoundException('User not found');
    return await this.userRepository.delete(id);
  }

  async getColumnNames() {
    const data = this.userRepository.metadata.propertiesMap;
    let newData = [];
    for (let i in data) {
      if (i !== 'password' && i !== 'analyzs') {
        newData.push({ id: data[i] });
      }
    }

    return newData;
  }
}
