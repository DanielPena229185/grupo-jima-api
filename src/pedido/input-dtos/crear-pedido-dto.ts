import { Producto } from '../pedido.entity';

export class CrearPedidoDTO {
  constructor(public productos: Producto[]) {}
}
