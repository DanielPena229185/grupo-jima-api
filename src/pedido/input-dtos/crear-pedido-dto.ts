import { IsString } from 'class-validator';
import { Producto } from '../pedido.entity';

export class CrearPedidoDTO {
  @IsString()
  public productos: Producto[];

  constructor(productos: Producto[]) {
    this.productos = productos;
  }
}
