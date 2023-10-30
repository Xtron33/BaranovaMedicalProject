import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
  Get,
  Req,
  Query,
  Param,
} from '@nestjs/common';
import { AnalyzService } from './analyz.service';
import { CreateAnalyzDto } from './dto/create-analyz.dto';
import { ClientKafka } from '@nestjs/microservices';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Roles } from '../auth/decorator/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/role-auth.guards';

@Controller('analyz')
export class AnalyzController {
  constructor(
    private readonly analyzService: AnalyzService,
    @Inject('analyz_microservi') private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('predicate');
  }
  @Post('/train')
  @Roles(['admin', 'super-admin'])
  @UseGuards(JwtAuthGuard, RolesGuard)
  train() {
    return this.analyzService.train();
  }
  @Post('/predicate')
  @UseGuards(JwtAuthGuard)
  async predicate(@Body() createAnalyzDto: CreateAnalyzDto) {
    return this.analyzService.predicate(createAnalyzDto);
  }
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() createAnalyzDto: CreateAnalyzDto) {
    return this.analyzService.createAnalyz(createAnalyzDto, +req.user.id);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.analyzService.getAll(page, limit);
  }
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getByUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req,
  ) {
    return this.analyzService.getAllByUser(+req.user.id, page, limit);
  }

  @Get('/columns')
  @UseGuards(JwtAuthGuard)
  async getColumns() {
    return this.analyzService.getColumnNames();
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: number, @Req() req) {
    return this.analyzService.getById(+req.user.id, id);
  }
}
