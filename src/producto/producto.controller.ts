import { Controller, Get, Param } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ObtenerProductosByTiendaId } from './input-dtos/get-productos-by-tienda-id.dto';
import { Producto } from 'src/entities';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get('/tienda/:tiendaTelefono')
  async getProductosByTiendaTelefono(
    @Param() param: ObtenerProductosByTiendaId,
  ): Promise<Producto[]> {
    return this.productoService.getProductosByTiendaTelefono(param);
  }
}
