import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Gramaje } from './gramaje.entity';
import { Tienda } from './tienda.entity';

@Entity({ name: 'productos', schema: 'public' })
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'precio', type: 'float', nullable: false })
  precio: number;

  @ManyToOne(() => Gramaje)
  gramaje: Gramaje;

  @ManyToOne(() => Tienda, (tienda) => tienda.productos)
  tienda: Tienda;
}
