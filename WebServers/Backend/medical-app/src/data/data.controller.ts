import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Roles } from '../auth/decorator/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/role-auth.guards';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @Roles(['super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createDatumDto: CreateDatumDto) {
    return this.dataService.create(createDatumDto);
  }

  @Get()
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.dataService.findAll();
  }

  @Get('columns')
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  getColumnsNames() {
    return this.dataService.getColumnNames();
  }

  @Get(':id')
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(+id);
  }

  @Patch(':id')
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateDatumDto: UpdateDatumDto) {
    return this.dataService.update(+id, updateDatumDto);
  }

  @Delete(':id')
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.dataService.remove(+id);
  }
}
