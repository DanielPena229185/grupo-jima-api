import { Injectable } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { Pedido } from './pedido.entity';

@Injectable()
export class PedidoService {
  constructor() {}

  crearPedido(pedidoDTO: CrearPedidoDTO): Promise<Pedido> {
    const pedido = new Pedido(1, pedidoDTO.productos, new Date(), 1);

    // TODO Guardar en la base de datos

    return Promise.resolve(pedido);
  }
}
