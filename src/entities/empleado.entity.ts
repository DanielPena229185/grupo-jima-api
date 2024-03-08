import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from "typeorm"
import { EmpleadoTortilleria } from "./empleado-tortilleria.entity";

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

    @OneToMany(() => EmpleadoTortilleria, empleados => empleados.empleado)
    tortillerias: EmpleadoTortilleria[];
}