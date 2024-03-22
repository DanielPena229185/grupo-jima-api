import { Injectable } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { Pedido, PedidoStatus } from 'src/entities';
import { PedidoService } from './pedido.service';
import { NegocioException } from 'src/utils/exceptions/negocio-exception';

@Injectable()
export class PedidoNegocio {
  constructor(private readonly pedidoService: PedidoService) {}

  async getAllPedidosPendientes(): Promise<Pedido[]> {
    return await this.pedidoService.getAllPedidosPendientes();
  }

  async getPedidoById(pedidoId: string): Promise<Pedido> {
    return await this.pedidoService.getPedidoById(pedidoId);
  }

  async getPedidosByTortilleriaId(tortilleriaId:string,estado:PedidoStatus):Promise<Pedido[]>{
    return await this.pedidoService.getPedidosByTortilleriaId(tortilleriaId,estado);
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
