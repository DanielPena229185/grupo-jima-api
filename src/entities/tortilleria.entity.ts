import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable} from "typeorm"
import { Pedido } from './pedido.entity'
import { EmpleadoTortilleria } from "./empleado-tortilleria.entity"

@Entity()
export class Tortilleria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    telefono: number

    @Column()
    nombre: string

    @Column()
    direccion: string

    @OneToMany(() => Pedido, pedido => pedido.tortilleria)
    pedidos: Pedido[];

    @OneToMany(() => EmpleadoTortilleria, empleados => empleados.tortilleria)
    empleados: EmpleadoTortilleria[];
}