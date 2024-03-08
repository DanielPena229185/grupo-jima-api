import { Entity, OneToMany} from "typeorm"
import { Empleado } from './empleado.entity'
import { Pedido } from './pedido.entity'

@Entity()
export class Repartidor extends Empleado {
    @OneToMany(() => Pedido, pedido => pedido.repartidor)
    pedidos: Pedido[];
}