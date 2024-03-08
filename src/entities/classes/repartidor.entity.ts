import { ChildEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Empleado } from './empleado.entity'
import { Pedido } from './pedido.entity'
import { Usuario } from "./usuario-entity";

@Entity({ name: "repartidores", schema: "public" })
export class Repartidor extends Usuario {
}