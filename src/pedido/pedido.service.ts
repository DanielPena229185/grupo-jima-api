import { Injectable } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { ObtenerPedidosByTiendaId } from './input-dtos/obtener-pedidos-por-tienda-id-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { Tienda } from 'src/entities/classes/tienda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Tienda) private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async getPedidoById(param: ObtenerPedidoById): Promise<Pedido> {
    // TODO Obtener de la base de datos
    return null; // TODO eliminar
  }

  async getPedidosByTiendaId(
    param: ObtenerPedidosByTiendaId,
  ): Promise<Pedido[]> {
    // TODO Obtener de la base de datos
    return null;
  }

  async crearPedido(crearPedidoDTO: CrearPedidoDTO): Promise<Pedido> {
    // TODO Guardar en la base de datos
    const tienda:Tienda = await this.tiendaRepository.findOneBy({id:crearPedidoDTO.tiendaId});
    return null;
  }
}
