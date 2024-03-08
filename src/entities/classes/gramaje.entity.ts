import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Producto } from './producto.entity';

@Entity({ name: "gramajes", schema: "public" })
export class Gramaje {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'float'})
    gramaje: number
}