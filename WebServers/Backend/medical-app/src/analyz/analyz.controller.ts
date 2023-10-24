import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AnalyzService } from './analyz.service';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller('analyz')
export class AnalyzController {
  constructor(private readonly analyzService: AnalyzService) {}

  @Post('/train')
  train() {
    return this.analyzService.train();
  }
  @Post('/predicate')
  predicate() {
    return this.analyzService.predicate();
  }
}
