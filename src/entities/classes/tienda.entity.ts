import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';

@Entity({ name: 'tiendas', schema: 'public' })
export class Tienda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telefono: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @OneToMany(() => Pedido, (pedido) => pedido.tienda)
  pedidos: Pedido[];

  @OneToMany(() => Producto, (producto) => producto.tienda)
  productos: Producto[];
}
