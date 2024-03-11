import { ChildEntity,JoinTable, OneToMany } from 'typeorm';
import { Empleado } from './empleado.entity';
import { UsuarioRol } from '../enums/usuario-roles-enum';
import { Tienda } from './tienda.entity';

@ChildEntity(UsuarioRol.REPARTIDOR)
export class Repartidor extends Empleado {
    @OneToMany(()=>Tienda, (tienda) => tienda.repartidor)
    tiendas: Tienda[];
}
