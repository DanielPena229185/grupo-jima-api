import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearPedidoDTO {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  detalles: string;

  @IsNotEmpty()
  paquetes: PaqueteDTO[];

  @IsString()
  @IsNotEmpty()
  tiendaId: string;
}

class PaqueteDTO{
  producto: ProductoDTO;
  cantidad: number;
}

class ProductoDTO{
  id: string;
  precio: number;
  gramaje: GramajeDTO;
}

class GramajeDTO{
  id: string;
  gramaje: number;
}
