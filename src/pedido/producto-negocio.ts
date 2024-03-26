import { Injectable } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { Pedido, PedidoStatus } from 'src/entities';
import { PedidoService } from './pedido.service';
import { NegocioException } from 'src/utils/exceptions/negocio-exception';
import { PedidoByTortilleria } from './input-dtos/pedido-by-tortilleria-id';
import { ObtenerPedidosByTortilleriaIdQueryDTO } from './input-dtos/obtener-pedidos-by-tortilleria-id.dto';

@Injectable()
export class PedidoNegocio {
  constructor(private readonly pedidoService: PedidoService) {}

  async getAllPedidosPendientesByTortilleriaId(tortilleriaId: string): Promise<Pedido[]> {
    return await this.pedidoService.getAllPedidosPendientesByTortilleriaId(tortilleriaId);
  }

  async getPedidoById(pedidoId: string): Promise<Pedido> {
    return await this.pedidoService.getPedidoById(pedidoId);
  }

  async getPedidoByTortilleriaIdAndEstado(query: ObtenerPedidosByTortilleriaIdQueryDTO, parametros: PedidoByTortilleria):Promise<Pedido[]>{
    return await this.pedidoService.getPedidoByTortilleriaIdAndEstado(query, parametros);
  }

  async crearPedido(pedido: CrearPedidoDTO): Promise<Pedido> {
    this.crearPedidoValidaciones(pedido);
    return await this.pedidoService.crearPedido(pedido);
  }

  async finalizarPedido(pedidoId: string): Promise<Pedido> {
    return await this.pedidoService.finalizarPedido(pedidoId);
  }

  async cancelarPedido(pedidoId: string): Promise<Pedido> {
    return await this.pedidoService.cancelarPedido(pedidoId);
  }

  private crearPedidoValidaciones(pedido: CrearPedidoDTO) {
    if (!pedido.tiendaTelefono && pedido.tiendaTelefono.length === 0) {
      throw new NegocioException(
        'Debe seleccionar una tienda para atender este pedido.',
      );
    }
    if (!pedido.paquetes || pedido.paquetes.length === 0) {
      throw new NegocioException(
        'Debe haber al menos un paquete en el pedido.',
      );
    }
    if (pedido.paquetes && pedido.paquetes.length > 0) {
      pedido.paquetes.some((paquete) => {
        if (!paquete.productoId) {
          throw new NegocioException(
            'Debe seleccionar algún producto para el paquete.',
          );
        }
        if (paquete.cantidad < 1) {
          throw new NegocioException(
            'Los paquetes del pedido deben contener al menos una unidad.',
          );
        }
      });
    }
  }
}
