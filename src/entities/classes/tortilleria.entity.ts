import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany} from "typeorm"
import { Pedido } from './pedido.entity'
import { Empleado } from "./empleado.entity"

@Entity({ name: "tortillerias", schema: "public" })
export class Tortilleria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    telefono: number

    @Column()
    nombre: string

    @Column()
    direccion: string

    @ManyToMany(() => Empleado,(empleado)=> empleado.tortillerias)
    empleados: Empleado[];
}