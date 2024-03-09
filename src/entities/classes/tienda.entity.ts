import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';

@Entity({ name: 'tiendas', schema: 'public' })
export class Tienda {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'telefono', unique: true, nullable: false })
  telefono: number;

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
}
