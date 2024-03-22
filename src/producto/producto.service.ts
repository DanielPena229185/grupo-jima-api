import { Injectable } from '@nestjs/common';
import { ObtenerProductosByTiendaId } from './input-dtos/get-productos-by-tienda-id.dto';
import { Producto, Tienda } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NegocioException } from 'src/utils/exceptions/negocio-exception';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto) private readonly productoRepository:Repository<Producto>,
    @InjectRepository(Tienda) private readonly tiendaRepository:Repository<Tienda>

    ) {}

  async getProductosByTiendaTelefono(
    param: ObtenerProductosByTiendaId,
  ): Promise<Producto[]> {

    const tienda = await this.tiendaRepository.findOneBy({telefono:param.tiendaTelefono});

    if(!tienda){
        throw new NegocioException('No se encontró a la Tienda');
    }

    return this.productoRepository.find({
      where:{
        tienda: {
          telefono: param.tiendaTelefono
        }
      },
      relations: {
        gramaje: true
      }
    });
  }
}
