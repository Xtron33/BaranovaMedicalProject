import { Module } from '@nestjs/common';
import { AnalyzService } from './analyz.service';
import { AnalyzController } from './analyz.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analyz } from './entities/analyz.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analyz]),
    ClientsModule.register([
      {
        name: 'analyz_microservi',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'analyz',
            brokers: [process.env.KAFKA_BROKERCONNECT],
          },
          producerOnlyMode: false,
          consumer: {
            groupId: 'neural',
            sessionTimeout: 300000,
          },
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configSevice: ConfigService) => ({
        secret: configSevice.get('JWT_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AnalyzController],
  providers: [AnalyzService],
})
export class AnalyzModule { }
