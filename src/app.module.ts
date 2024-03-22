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
import { PedidoNegocio } from './pedido/producto-negocio';
import { GramajeController } from './gramaje/gramaje.controller';
import { TiendaController } from './tienda/tienda.controller';
import { TiendaService } from './tienda/tienda.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions),
    EntitiesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, PedidoController, ProductoController, GramajeController, TiendaController],
  providers: [AppService, PedidoService, ProductoService, PedidoNegocio, TiendaService],
})
export class AppModule {}
