import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataModule } from './data/data.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './records/records.module';
import { FileModule } from './file/file.module';
import { AnalyzModule } from './analyz/analyz.module';

@Module({
  imports: [
    UserModule,
    DataModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configSevice: ConfigService) => ({
        type: 'postgres',
        host: configSevice.get('DB_HOST'),
        port: configSevice.get('DB_PORT'),
        username: configSevice.get('DB_USERNAME'),
        password: configSevice.get('DB_PASSWORD'),
        database: configSevice.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
    RecordsModule,
    FileModule,
    AnalyzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
