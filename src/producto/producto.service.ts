import { Injectable } from '@nestjs/common';
import { Producto } from './producto.entity';
import { ObtenerProductosByTiendaId } from './input-dtos/get-productos-by-tienda-id.dto';

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
