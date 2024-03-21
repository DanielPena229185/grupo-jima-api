import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { PedidoNegocio } from './producto-negocio';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoNegocio: PedidoNegocio) {}

  @Get('/pendientes')
  async getAllPedidosPendientes(): Promise<Pedido[]> {
    return await this.pedidoNegocio.getAllPedidosPendientes();
  }

  @Get('/:pedidoId')
  async getPedidoPorId(@Param() param: ObtenerPedidoById): Promise<Pedido> {
    return this.pedidoNegocio.getPedidoById(param.pedidoId);
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
