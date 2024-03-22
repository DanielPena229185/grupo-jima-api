import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tienda } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TiendaService {
    constructor(
    @InjectRepository(Tienda) private readonly tiendaRepository: Repository<Tienda>,
    ){}
    async getTiendaByTelefono(telefonoTienda:string):Promise<Tienda>{
        const tienda:Tienda = await this.tiendaRepository.findOneBy({telefono:telefonoTienda});
        return tienda;
    }
}
