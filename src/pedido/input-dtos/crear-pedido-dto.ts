import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CrearPedidoDTO {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  detalles: string;

  @IsNotEmpty()
  paquetes: PaqueteDTO[];

  @IsString()
  @IsNotEmpty()
  tiendaTelefono: string;
}

class PaqueteDTO {
  @IsString()
  @IsNotEmpty()
  productoId: string;

  @IsNumber()
  cantidad: number;
}
