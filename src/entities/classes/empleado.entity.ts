import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, TableInheritance} from "typeorm"
import { Tortilleria } from "./tortilleria.entity";
import { Usuario } from "./usuario-entity";

@Entity({ name: "empleados", schema: "public" })
export class Empleado extends Usuario {

    @ManyToMany(() => Tortilleria, (tortilleria)=>tortilleria.empleados)
    @JoinTable()
    tortillerias: Tortilleria[];
}