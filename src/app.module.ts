import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './pedido/pedido.service';
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';
import { EntitiesModule } from './entities/entities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions),
    EntitiesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, PedidoController, ProductoController],
  providers: [AppService, PedidoService, ProductoService],
})
export class AppModule {}
