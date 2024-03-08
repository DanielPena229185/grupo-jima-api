import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany} from "typeorm"
import { Pedido } from './pedido.entity'
import { Empleado } from "./empleado.entity"

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

    @ManyToMany(() => Empleado, empleados => empleados.tortillerias)
    empleados: Empleado[];
}