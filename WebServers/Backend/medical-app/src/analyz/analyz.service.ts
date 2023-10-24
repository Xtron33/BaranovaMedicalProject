import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import * as crypto from 'crypto';
@Injectable()
export class AnalyzService {
  constructor(
    @Inject('analyz_microservi') private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('predicate');
  }

  train() {
    return this.client.emit('train', 'start_train');
  }
  predicate() {
    let id = crypto.randomUUID();
    return this.client.send('predicate', { value: 'start_predicate', key: id });
  }
}
