import { Inject, Injectable } from '@nestjs/common';
import { CreateAnalyzDto } from './dto/create-analyz.dto';
import { UpdateAnalyzDto } from './dto/update-analyz.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AnalyzService {
  constructor(
    @Inject('analyz_microservi') private readonly client: ClientKafka,
  ) {}

  create(createAnalyzDto: CreateAnalyzDto) {
    return 'This action adds a new analyz';
  }

  findAll() {
    return `This action returns all analyz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analyz`;
  }

  update(id: number, updateAnalyzDto: UpdateAnalyzDto) {
    return `This action updates a #${id} analyz`;
  }

  remove(id: number) {
    return `This action removes a #${id} analyz`;
  }
  sendMessage(message: string) {
    console.log(message);
    return this.client.emit('train', message);
  }
}
