import { IsNotEmpty, IsString } from "class-validator";

export class TiendaTelefonoDTO{
    @IsNotEmpty()
    @IsString()
   public telefonoTienda: string;

}