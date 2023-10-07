import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/role-auth.guards';
import { Roles } from '../auth/decorator/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  @UsePipes(new ValidationPipe())
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('createAdmin')
  @UsePipes(new ValidationPipe())
  @Roles(['super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createAdmin(createUserDto);
  }

  @Get(':id')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}
