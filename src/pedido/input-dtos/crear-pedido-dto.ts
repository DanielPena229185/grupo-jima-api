import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Paquete } from 'src/entities/classes/paquete.entity';

export class CrearPedidoDTO {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  detalles: string;

  @IsNotEmpty()
  paquetes: Paquete[];

  @IsString()
  @IsNotEmpty()
  tiendaId: string;
}
