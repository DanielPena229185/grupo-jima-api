import { IsNotEmpty, IsString } from 'class-validator';
import { PedidoStatus } from 'src/entities';

export class PedidoByTortilleria {
  @IsNotEmpty()
  @IsString()
  public tortilleriaId: string;

  @IsNotEmpty()
  @IsString()
  public estado:PedidoStatus;
}