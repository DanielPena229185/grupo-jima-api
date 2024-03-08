import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Paquete } from './paquete.entity';
import { Tienda } from './tienda.entity';
import { Repartidor } from "./repartidor.entity";
import { Tortilleria } from "./tortilleria.entity";
import { PedidoStatus } from "../enums/pedido-status-enum";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    codigoRastreo: number

    @Column()
    numeroRecorrido: number

    @Column()
    detalles: string

    @Column({
        type: "enum",
        nullable: false,
        enum: PedidoStatus,
        default: PedidoStatus.PENDIENTE
    })
    estado: PedidoStatus

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fechaHoraCreacion: Date

    @Column({type:'datetime'})
    fechaHoraActualizado: Date

    @Column({type:'decimal'})
    total: number

    @OneToMany(() => Paquete, paquete => paquete.pedido, { cascade: ["remove"] })
    paquetes: Paquete[];

    @ManyToOne(() => Repartidor, repartidor => repartidor.pedidos)
    @JoinColumn({name: 'repartidor_id'})
    repartidor: Repartidor;

    @ManyToOne(() => Tienda, tienda => tienda.pedidos)
    @JoinColumn({name: 'tienda_id'})
    tienda: Tienda;

    @ManyToOne(() => Tortilleria, tortilleria => tortilleria.pedidos)
    @JoinColumn({name: 'pedidos_id'})
    tortilleria: Tortilleria;

}