import { ChildEntity, Entity } from 'typeorm';
import { Empleado } from './empleado.entity';
import { UsuarioRol } from '../enums/usuario-roles-enum';

@ChildEntity(UsuarioRol.REPARTIDOR)
export class Repartidor extends Empleado {}
