import { Injectable } from '@nestjs/common';
import { ObtenerProductosByTiendaId } from './input-dtos/get-productos-by-tienda-id.dto';
import { Producto } from 'src/entities';

@Injectable()
export class ProductoService {
  constructor() {}

  async getProductosByTiendaId(
    tiendaId: ObtenerProductosByTiendaId,
  ): Promise<Producto[]> {
    console.log(tiendaId.tiendaId);
    return;
  }
}
