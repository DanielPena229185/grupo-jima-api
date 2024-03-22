import { IsNotEmpty, IsString } from 'class-validator';

export class ObtenerPedidoById {
  @IsNotEmpty()
  @IsString()
  public pedidoId: string;
}
