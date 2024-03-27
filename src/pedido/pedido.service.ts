import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { Tienda } from 'src/entities/classes/tienda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Paquete, PedidoStatus, Producto, Tortilleria } from 'src/entities';
import { NegocioException } from 'src/utils/exceptions/negocio-exception';
import { PedidoByTortilleria } from './input-dtos/pedido-by-tortilleria-id';
import { EncontrarPedidosByTortilleriaIdQueryDTO } from './input-dtos/obtener-pedidos-by-tortilleria-id.dto';
import { EncontrarPedidoById } from './input-dtos/obtener-pedido-by-id.dto';
import { PedidoByIdDTO } from './input-dtos/pedido-by-id.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Tortilleria)
    private readonly tortilleriaRepository: Repository<Tortilleria>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) { }

  async getAllPedidosPendientesByTortilleriaId(tortilleriaId: string): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: {
        tortilleria: {
          id: tortilleriaId
        },
        estado: PedidoStatus.PENDIENTE,
      },
      select: {
        id: true,
        codigoRastreo: true,
        fechaHoraCreacion: true,
      },
      relations: {
        tienda: true,
      },
    });
  }

  async getPedidoById(query: EncontrarPedidoById, param: PedidoByIdDTO): Promise<Pedido> {
    const pedido: Pedido = await this.pedidoRepository.findOne({
      where: {
        id: param.pedidoId,
      },
      select: query.campos,
      relations: query.relaciones
    });
    if (pedido === null) {
      throw new NegocioException('No se encontró el Pedido solicitado.');
    } else {
      return pedido;
    }
  }

  async getPedidoByTortilleriaIdAndEstado(query: EncontrarPedidosByTortilleriaIdQueryDTO, parametros: PedidoByTortilleria): Promise<Pedido[]> {
    const tortilleria: Tortilleria = await this.tortilleriaRepository.findOneBy({ id: parametros.tortilleriaId });
    if (!tortilleria) {
      throw new NegocioException('No se encontró a la Tortilleria.');
    }
    const filtroExclusivo: FindOptionsWhere<Pedido> = {
      tortilleria: {
        id: parametros.tortilleriaId
      },
      estado: parametros.estado
    }
    const opcionesWhere: FindOptionsWhere<Pedido>[] = [];
    if (query.codigoRastreo) {
      opcionesWhere.push({
        codigoRastreo: Like(`%${query.codigoRastreo}%`),
      })
    }
    if (query.detalles) {
      opcionesWhere.push({
        detalles: Like(`%${query.detalles}%`),
      })
    }
    if (query.nombreTienda) {
      opcionesWhere.push({
        tienda: {
          nombre: Like(`%${query.nombreTienda}%`)
        }
      })
    }
    let whereOptionsConFiltro: FindOptionsWhere<Pedido>[] = opcionesWhere.map(opcion => {
      return {
        ...opcion,
        ...filtroExclusivo
      };
    });
    if(whereOptionsConFiltro.length === 0){
      whereOptionsConFiltro.push(filtroExclusivo);
    }
    const pedidos: Pedido[] = await this.pedidoRepository.find({
      where: whereOptionsConFiltro,
      select: query.campos,
      relations: query.relaciones
    });
    return pedidos;
  }

  async finalizarPedido(pedidoId: string): Promise<Pedido> {
    const pedido: Pedido = await this.pedidoRepository.findOneBy({
      id: pedidoId,
    });
    if (!pedido) {
      throw new NegocioException('No se encontró el Pedido.');
    }
    if (pedido.estado != PedidoStatus.PENDIENTE) {
      throw new NegocioException(`Tu pedido ya se encuentra ${pedido.estado}`);
    }
    pedido.estado = PedidoStatus.LISTO;
    return await this.pedidoRepository.save(pedido);
  }

  async cancelarPedido(pedidoId: string): Promise<Pedido> {
    const pedido: Pedido = await this.pedidoRepository.findOneBy({
      id: pedidoId,
    });
    if (!pedido) {
      throw new NegocioException('No se encontró el Pedido.');
    }
    if (pedido.estado == PedidoStatus.CANCELADO) {
      throw new NegocioException(`Tu pedido ya se encuentra ${pedido.estado}`);
    }
    pedido.estado = PedidoStatus.CANCELADO;
    return await this.pedidoRepository.save(pedido);
  }

  async crearPedido(crearPedidoDTO: CrearPedidoDTO): Promise<Pedido> {
    const tienda: Tienda = await this.tiendaRepository.findOne({
      where: {
        telefono: crearPedidoDTO.tiendaTelefono
      },
      relations: {
        repartidor: true,
        tortilleria: true,
      },
    });
    if (!tienda) {
      throw new NotFoundException(
        `No se encontró la tienda con el siguiente telefono ${crearPedidoDTO.tiendaTelefono}`,
      );
    }
    const paquetes: Paquete[] = [];
    for (const paqueteDTO of crearPedidoDTO.paquetes) {
      const paquete: Paquete = new Paquete();
      const producto = await this.productoRepository.findOneBy({
        id: paqueteDTO.productoId,
      });
      if (!producto) {
        throw new NotFoundException(
          `No se encontró el producto con el id ${paqueteDTO.productoId}`,
        );
      }
      paquete.producto = producto;
      paquete.cantidad = paqueteDTO.cantidad;
      paquetes.push(paquete);
    }
    let codigoRastreoGenerado;
    do {
      codigoRastreoGenerado = this.generarCodigo(8);
    } while (!this.codigoExiste(codigoRastreoGenerado));
    const pedido: Pedido = new Pedido();
    pedido.detalles = crearPedidoDTO.detalles;
    pedido.numeroRecorrido = this.numeroDeRecorrido();
    pedido.tienda = tienda;
    pedido.repartidor = tienda.repartidor;
    pedido.tortilleria = tienda.tortilleria;
    pedido.paquetes = paquetes;
    pedido.codigoRastreo = codigoRastreoGenerado;
    const pedidoGuardado: Pedido = await this.pedidoRepository.save(pedido);
    return pedidoGuardado;
  }

  private numeroDeRecorrido(): number {
    const horaActual = new Date().getHours();
    if (horaActual <= 9) {
      return 2;
    } else if (horaActual <= 13) {
      return 3;
    } else {
      return 0;
    }
  }

  private generarCodigo(longitud: number): string {
    let codigo = '';
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < longitud; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return codigo;
  }

  private codigoExiste(codigo: string): Promise<boolean> {
    return this.pedidoRepository.exists({
      where: {
        codigoRastreo: codigo,
      },
    });
  }
}
