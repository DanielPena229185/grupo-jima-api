import { Injectable } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { Pedido } from './pedido.entity';
import { ObtenerPedidosByTiendaId } from './input-dtos/obtener-pedidos-por-tienda-id-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';

@Injectable()
export class PedidoService {
  constructor() {}

  async getPedidoById(param: ObtenerPedidoById): Promise<Pedido> {
    // TODO Obtener de la base de datos
    return Promise.resolve(new Pedido(param.pedidoId, [], new Date(), 1)); // TODO eliminar
  }

  async getPedidosByTiendaId(
    param: ObtenerPedidosByTiendaId,
  ): Promise<Pedido[]> {
    // TODO Obtener de la base de datos
    console.log(param);
    return Promise.resolve([
      new Pedido('1', [], new Date(), 1),
      new Pedido('2', [], new Date(), 2), // TODO eliminar
    ]);
  }

  crearPedido(pedidoDTO: CrearPedidoDTO): Promise<Pedido> {
    const pedido = new Pedido('1', pedidoDTO.productos, new Date(), 1);

    // TODO Guardar en la base de datos

    return Promise.resolve(pedido);
  }
}
