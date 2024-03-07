import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { ObtenerPedidosByTiendaId } from './input-dtos/obtener-pedidos-por-tienda-id-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get('/tienda/:tiendaId')
  async getPedidosPorTienda(
    @Param() tiendaId: ObtenerPedidosByTiendaId,
  ): Promise<Pedido[]> {
    return this.pedidoService.getPedidosByTiendaId(tiendaId);
  }

  // TODO agregar /pedido/:idPedido
  @Get('/:pedidoId')
  async getPedidoPorId(@Param() pedidoId: ObtenerPedidoById): Promise<Pedido> {
    return this.pedidoService.getPedidoById(pedidoId);
  }

  @Post()
  async postPedido(@Body() body: CrearPedidoDTO): Promise<Pedido> {
    return this.pedidoService.crearPedido(body);
  }
}
