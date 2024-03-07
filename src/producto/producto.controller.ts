import { Controller, Get, Param } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { ObtenerProductosByTiendaId } from './input-dtos/get-productos-by-tienda-id.dto';

@Controller('producto')
export class ProductoController {
    constructor(
        private readonly productoService: ProductoService
    ){}

    @Get('tienda/:tiendaId')
    async getProductosByTiendaId(@Param() tiendaId: ObtenerProductosByTiendaId): Promise<Producto[]> {
        return this.productoService.getProductosByTiendaId(tiendaId);
    }
}
