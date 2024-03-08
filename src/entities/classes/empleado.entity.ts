import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from "typeorm"
import { Tortilleria } from "./tortilleria.entity";

@Entity()
export class Empleado {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    codigoEmpleado: number

    @Column({unique: true})
    telefono: number

    @Column()
    nombre: string

    @ManyToMany(() => Tortilleria, tortilleria => tortilleria.empleados)
    tortillerias: Tortilleria[];
}