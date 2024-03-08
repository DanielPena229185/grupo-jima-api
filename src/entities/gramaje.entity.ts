import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import { Producto } from './producto.entity';

@Entity()
export class Gramaje {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'decimal'})
    gramaje: number

    @OneToMany(() => Producto, producto => producto.gramaje)
    productos: Producto[];
}