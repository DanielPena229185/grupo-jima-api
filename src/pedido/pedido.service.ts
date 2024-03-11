import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { ObtenerPedidosByTiendaId } from './input-dtos/obtener-pedidos-por-tienda-id-dto';
import { ObtenerPedidoById } from './input-dtos/obtener-pedido-by-id-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { Tienda } from 'src/entities/classes/tienda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, Repository } from 'typeorm';
import { Paquete, Repartidor, Tortilleria } from 'src/entities';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Tienda) private readonly tiendaRepository: Repository<Tienda>,
    @InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Repartidor) private readonly repartidorRepository: Repository<Repartidor>,
    @InjectRepository(Tortilleria) private readonly tortilleriaRepository: Repository<Tortilleria>,

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
    const tienda:Tienda = await this.tiendaRepository.findOne({
      where:{
        id:crearPedidoDTO.tiendaId,
      },
      relations: {
        repartidor: true,
        tortilleria: true
      }
    });
    if(!tienda){
      throw new NotFoundException(`No se encontro Tienda con el id : ${crearPedidoDTO.tiendaId}`);
    }

    let codigoRastreoGenerado
    do{
      codigoRastreoGenerado = this.generarCodigo(8);

    }while(!this.codigoExiste(codigoRastreoGenerado))

    const pedido = new Pedido();
    pedido.codigoRastreo = codigoRastreoGenerado;
    pedido.detalles = crearPedidoDTO.detalles;
    pedido.numeroRecorrido = this.numeroDeRecorrido();
    pedido.paquetes = crearPedidoDTO.paquetes as Paquete[];
    pedido.repartidor = tienda.repartidor;
    pedido.tienda = tienda;
    pedido.tortilleria = tienda.tortilleria;
    const pedidoCreado: Pedido = await this.pedidoRepository.save(pedido);
    pedidoCreado.id
    return pedidoCreado;
  }

  
  private numeroDeRecorrido():number{
      const horaActual = new Date().getHours();
      if (horaActual <=9) {
        return 2;
      } else if (horaActual <= 13) {
        return 3;
      }else{
        return 0;
      }
  }

  private generarCodigo(longitud: number): string {
    let codigo = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < longitud; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return codigo;
  }

  private codigoExiste(codigo:string):Promise<Boolean>{
      return this.pedidoRepository.exists({
        where: {
          codigoRastreo: codigo
        }
      });
  }
}
