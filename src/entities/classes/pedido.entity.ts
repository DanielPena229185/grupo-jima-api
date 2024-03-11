import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { Paquete } from './paquete.entity';
import { Tienda } from './tienda.entity';
import { Repartidor } from './repartidor.entity';
import { Tortilleria } from './tortilleria.entity';
import { PedidoStatus } from '../enums/pedido-status-enum';

@Entity({ name: 'pedidos', schema: 'public' })
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({
    name: 'codigo_rastreo',
    length: 8,
    nullable: false,
    //default: ()=> "unique_random(8,'pedidos','codigo_rastreo')"
  })
  @Index({ unique: true })
  codigoRastreo: string;

  @Column({ name: 'numero_recorrido', nullable: false })
  numeroRecorrido: number;

  @Column({ name: 'detalles', nullable: true })
  detalles: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: PedidoStatus,
  })
  estado: PedidoStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  fechaHoraCreacion: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
  })
  fechaHoraActualizado: Date;

  @Column({ name: 'total', type: 'float', nullable: false })
  total: number;

  @OneToMany(() => Paquete, (paquete) => paquete.pedido, {
    cascade: ['remove', 'update'],
  })
  paquetes: Paquete[];

  @ManyToOne(() => Repartidor)
  @JoinColumn({ name: 'repartidor_id' })
  repartidor: Repartidor;

  @ManyToOne(() => Tienda, (tienda) => tienda.pedidos)
  @JoinColumn({ name: 'tienda_id' })
  tienda: Tienda;

  @ManyToOne(() => Tortilleria)
  @JoinColumn({ name: 'tortilleria_id' })
  tortilleria: Tortilleria;

  @BeforeInsert()
  private beforeInsert(): void {
    this.fechaHoraCreacion = new Date();
    this.fechaHoraActualizado = this.fechaHoraCreacion;
    this.estado = PedidoStatus.PENDIENTE;
    this.calculateTotal();
  }

  @BeforeUpdate()
  private beforeUpdate(): void {
    this.fechaHoraActualizado = new Date();
    this.calculateTotal();
  }

  private calculateTotal() {
    this.total = 0;
    for (const paquete of this.paquetes) {
      this.total += paquete.cantidad * paquete.producto.precio;
    }
  }
}
