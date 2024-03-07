import { Producto } from '../pedido.entity';

export class CrearPedidoDTO {
  public productos: Producto[];

  constructor(productos: Producto[]) {
    this.productos = productos;
  }
}
