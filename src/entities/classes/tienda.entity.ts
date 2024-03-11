import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';
import { Repartidor } from './repartidor.entity';
import { Tortilleria } from './tortilleria.entity';

@Entity({ name: 'tiendas', schema: 'public' })
export class Tienda {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'telefono', unique: true, nullable: false })
  telefono: string;

  @Column({ name: 'nombre', nullable: false })
  nombre: string;

  @Column({ name: 'direccion', nullable: false })
  direccion: string;

  @OneToMany(() => Pedido, (pedido) => pedido.tienda)
  pedidos: Pedido[];

  @OneToMany(() => Producto, (producto) => producto.tienda, {
    cascade: ['remove']
  })
  productos: Producto[];

  @ManyToOne(()=>Repartidor,(repartidor)=> repartidor.tiendas)
  @JoinColumn({ name: 'repartidor_id' })
  repartidor:Repartidor;

  @ManyToOne(()=>Tortilleria,(tortilleria)=> tortilleria.tiendas)
  @JoinColumn({ name: 'tortilleria_id' })
  tortilleria:Tortilleria;
}
