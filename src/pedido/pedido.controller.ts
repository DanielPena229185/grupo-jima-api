import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { PedidoNegocio } from './producto-negocio';
import { PedidoByTortilleria } from './input-dtos/pedido-by-tortilleria-id';
import { ObtenerPedidosByTortilleriaIdDecorator } from './decorators/obtener-pedidos-by-tortilleria-id.decorator';
import { ObtenerPedidosByTortilleriaIdQueryDTO } from './input-dtos/obtener-pedidos-by-tortilleria-id.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoNegocio: PedidoNegocio) { }

  @Get('/:pedidoId')
  async getPedidoPorId(@Param() param: ObtenerPedidoById): Promise<Pedido> {
    return this.pedidoNegocio.getPedidoById(param.pedidoId);
  }

  @Get('/:tortilleriaId/:estado')
  async getPedidoByTortilleriaIdAndEstado(
    @ObtenerPedidosByTortilleriaIdDecorator() query: ObtenerPedidosByTortilleriaIdQueryDTO,
    @Param() param: PedidoByTortilleria): Promise<Pedido[]> {
    return this.pedidoNegocio.getPedidoByTortilleriaIdAndEstado(query, param);
  }

  @Post()
  async postPedido(@Body() body: CrearPedidoDTO): Promise<Pedido> {
    return await this.pedidoNegocio.crearPedido(body);
  }

  @Patch('/:pedidoId/finalizar')
  async finalizarPedido(@Param() param: ObtenerPedidoById): Promise<Pedido> {
    return await this.pedidoNegocio.finalizarPedido(param.pedidoId);
  }

  @Patch('/:pedidoId/cancelar')
  async cancelarPedido(@Param() param: ObtenerPedidoById): Promise<Pedido> {
    return await this.pedidoNegocio.cancelarPedido(param.pedidoId);
  }
}
