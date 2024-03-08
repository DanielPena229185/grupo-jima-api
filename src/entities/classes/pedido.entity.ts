import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, BeforeUpdate} from "typeorm";
import { Paquete } from './paquete.entity';
import { Tienda } from './tienda.entity';
import { Repartidor } from "./repartidor.entity";
import { Tortilleria } from "./tortilleria.entity";
import { PedidoStatus } from "../enums/pedido-status-enum";

@Entity({ name: "pedidos", schema: "public" })
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

    @CreateDateColumn({ 
        name: "created_at", 
        type: "timestamp", 
        nullable: false 
      })    fechaHoraCreacion: Date

      @UpdateDateColumn({ 
        name: "updated_at", 
        type: "timestamp", 
        nullable: false 
      })    fechaHoraActualizado: Date

    @Column({type:'float'})
    total: number

    @OneToMany(() => Paquete, paquete => paquete.pedido, { cascade: ["remove"] })
    paquetes: Paquete[];

    @ManyToOne(() => Repartidor)
    @JoinColumn({name: 'repartidor_id'})
    repartidor: Repartidor;

    @ManyToOne(() => Tienda, tienda => tienda.pedidos)
    @JoinColumn({name: 'tienda_id'})
    tienda: Tienda;

    @ManyToOne(() => Tortilleria)
    @JoinColumn({name: 'tortilleria_id'})
    tortilleria: Tortilleria;

    @BeforeInsert()
    private beforeInsert(): void{
      this.fechaHoraCreacion = new Date();
      this.fechaHoraActualizado = this.fechaHoraCreacion;
      this.calculateTotal();
    }
  
    @BeforeUpdate()
    private beforeUpdate(): void{
      this.fechaHoraActualizado = new Date();
    }
    
    private calculateTotal(){
        for(let paquete of this.paquetes){
            this.total+=(paquete.cantidad*paquete.producto.precio);
        }
    }

}