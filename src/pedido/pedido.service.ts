import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearPedidoDTO } from './input-dtos/crear-pedido-dto';
import { Pedido } from 'src/entities/classes/pedido.entity';
import { Tienda } from 'src/entities/classes/tienda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paquete, PedidoStatus, Producto, Repartidor, Tortilleria } from 'src/entities';
import { PedidoOutputDTO } from './output-dtos/pedido-output-dto';
import { NegocioException } from 'src/utils/exceptions/negocio-exception';

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

    async getAllPedidosPendientes():Promise<Pedido[]>{
      return this.pedidoRepository.find({
        where:{
          estado: PedidoStatus.PENDIENTE
        },
        select: {
          id: true,
          codigoRastreo: true,
          fechaHoraCreacion: true
        },
        relations:{
          tienda:true,
        }
      });
    }

  async getPedidoById(pedidoId:string): Promise<Pedido> {
    const pedido:Pedido= await this.pedidoRepository.findOne({
      where:
      {
        id:pedidoId
      },
      select:{
        repartidor:{
          nombres: true,
          apellidos: true
        },
        tortilleria:{
          nombre: true
        },
        tienda:{
          nombre: true,
          telefono: true
        },
      },
      relations: ['repartidor','tortilleria','tienda','paquetes','paquetes.producto','paquetes.producto.gramaje']
    }
    );
    if(pedido ===null){
      throw new NegocioException('No se encontró el Pedido solicitado.');
  }else{
      return pedido;
  }
  }

  async finalizarPedido(pedidoId:string):Promise<Pedido>{
    const pedido:Pedido = await this.pedidoRepository.findOneBy({id:pedidoId});
    if(!pedido){
      throw new NegocioException('No se encontró el Pedido.');
    }
    if(pedido.estado!=PedidoStatus.PENDIENTE){
      throw new NegocioException(`Tu pedido ya se encuentra ${pedido.estado}`);
    }
    pedido.estado = PedidoStatus.LISTO;
    return await this.pedidoRepository.save(pedido);
  }

  async cancelarPedido(pedidoId:string):Promise<Pedido>{
    const pedido:Pedido = await this.pedidoRepository.findOneBy({id:pedidoId});
    if(!pedido){
      throw new NegocioException('No se encontró el Pedido.');
    }
    if(pedido.estado==PedidoStatus.CANCELADO){
      throw new NegocioException(`Tu pedido ya se encuentra ${pedido.estado}`);
    }
    pedido.estado = PedidoStatus.CANCELADO;
    return await this.pedidoRepository.save(pedido);
  }

  async crearPedido(crearPedidoDTO: CrearPedidoDTO): Promise<Pedido> {
    const tienda: Tienda = await this.tiendaRepository.findOne({
      where: {
        id: crearPedidoDTO.tiendaId
      },
      relations: {
        repartidor: true,
        tortilleria: true,
      }
    });
    if (!tienda) {
      throw new NotFoundException(`No se encontró la tienda con el id ${crearPedidoDTO.tiendaId}`)
    }
    let paquetes: Paquete[] = [];
    for(let paqueteDTO of crearPedidoDTO.paquetes){
      let paquete: Paquete = new Paquete();
      const producto = await this.productoRepository.findOneBy({id : paqueteDTO.productoId});
      if(!producto){
        throw new NotFoundException(`No se encontró el producto con el id ${paqueteDTO.productoId}`);
      }
      paquete.producto = producto;
      paquete.cantidad = paqueteDTO.cantidad;
      paquetes.push(paquete);
    } 
    let codigoRastreoGenerado;
    do {
      codigoRastreoGenerado = this.generarCodigo(8);
    } while (!this.codigoExiste(codigoRastreoGenerado));
    let pedido: Pedido = new Pedido();
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
