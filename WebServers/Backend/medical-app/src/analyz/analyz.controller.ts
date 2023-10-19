import { Controller, Post, Body } from '@nestjs/common';
import { AnalyzService } from './analyz.service';

@Controller('analyz')
export class AnalyzController {
  constructor(private readonly analyzService: AnalyzService) {}

  @Post()
  appMessage(@Body() message: string) {
    return this.analyzService.sendMessage(message);
  }
}
