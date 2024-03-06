import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './pedido/pedido.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmOptions)],
  controllers: [AppController, PedidoController],
  providers: [AppService, PedidoService],
})
export class AppModule {}
