import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { Gramaje } from './gramaje.entity';
import { Paquete } from './paquete.entity';
import { Tienda } from './tienda.entity';

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'decimal'})
    precio: number

    @ManyToOne(() => Gramaje, gramaje => gramaje.productos)
    gramaje: Gramaje;

    @OneToMany(() => Paquete, paquete => paquete.producto, { cascade: ["remove"] })
    paquetes: Paquete[];

    @ManyToOne(() => Tienda, tienda => tienda.productos)
    tienda: Tienda;
}
