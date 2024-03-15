import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { ObtenerPedidosByTiendaId } from './input-dtos/obtener-pedidos-por-tienda-id-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { ProductoNegocio } from './producto-negocio';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly productoNegocio: ProductoNegocio) {}

  @Get('/tienda/:tiendaId')
  async getPedidosPorTienda(
    @Param() tiendaId: ObtenerPedidosByTiendaId,
  ): Promise<Pedido[]> {
    return //this.productoNegocio.getPedidosByTiendaId();
  }

  // TODO agregar /pedido/:idPedido
  @Get('/:pedidoId')
  async getPedidoPorId(@Param() pedidoId: ObtenerPedidoById): Promise<Pedido> {
    return //this.productoNegocio.getPedidoById();
  }

  @Post()
  async postPedido(@Body() body: CrearPedidoDTO): Promise<Pedido> {
    return await this.productoNegocio.crearPedido(body);
  }
}
