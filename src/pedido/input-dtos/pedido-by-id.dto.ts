import { IsNotEmpty, IsString } from 'class-validator';

export class PedidoByIdDTO {
  @IsNotEmpty()
  @IsString()
  public pedidoId: string;
}