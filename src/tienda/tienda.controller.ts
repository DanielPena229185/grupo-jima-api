import { Controller, Get, Param } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { TiendaTelefonoDTO } from './input-dto/tienda-telefono-dto';
import { Tienda } from 'src/entities';

@Controller('tienda')
export class TiendaController {
    constructor(
        private readonly tiendaService: TiendaService
    ){}

    @Get('/:telefonoTienda')
    async getTiendaByTelefono(@Param() param:TiendaTelefonoDTO):Promise<Tienda>{
       return this.tiendaService.getTiendaByTelefono(param.telefonoTienda);
    }
}
