import { IsString } from 'class-validator';

export class ObtenerProductosByTiendaId {
  @IsString()
  tiendaId: string;
}
