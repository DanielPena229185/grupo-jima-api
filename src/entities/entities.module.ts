import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadoTortilleria } from './classes/empleado-tortilleria.entity';
import { Empleado } from './classes/empleado.entity';
import { Gramaje } from './classes/gramaje.entity';
import { Paquete } from './classes/paquete.entity';
import { Pedido } from './classes/pedido.entity';
import { Producto } from './classes/producto.entity';
import { Repartidor } from './classes/repartidor.entity';
import { Tienda } from './classes/tienda.entity';
import { Tortilleria } from './classes/tortilleria.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        EmpleadoTortilleria,
        Empleado,
        Gramaje,
        Paquete,
        Pedido,
        Producto,
        Repartidor,
        Tienda,
        Tortilleria
    ])],
    exports: [TypeOrmModule],
})
export class EntitiesModule {}
