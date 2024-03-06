import { Body, Controller, Post } from '@nestjs/common';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  // TODO agregar /pedido/tienda/:idTienda
  // TODO agregar /pedido/:idPedido

  @Post()
  async postPedido(@Body() body: CrearPedidoDTO): Promise<Pedido> {
    return this.pedidoService.crearPedido(body);
  }
}
