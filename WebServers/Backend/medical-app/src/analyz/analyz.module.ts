import { Module } from '@nestjs/common';
import { AnalyzService } from './analyz.service';
import { AnalyzController } from './analyz.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'analyz_microservi',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'analyz',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'neural',
          },
        },
      },
    ]),
  ],
  controllers: [AnalyzController],
  providers: [AnalyzService],
})
export class AnalyzModule {}
