import { IsNotEmpty, IsString } from 'class-validator';

export class ObtenerProductosByTiendaId {
  @IsString()
  @IsNotEmpty()
  tiendaTelefono: string;
}
