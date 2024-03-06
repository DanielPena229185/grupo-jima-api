import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
