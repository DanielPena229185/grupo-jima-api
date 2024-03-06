import { IsString } from 'class-validator';

export class ObtenerPedidoById {
  @IsString()
  public pedidoId: string;

  constructor(pedidoId: string) {
    this.pedidoId = pedidoId;
  }
}
