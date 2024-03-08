import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity';

@Entity()
export class Paquete {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.paquetes)
  @JoinColumn({name: 'pedido_id'})
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.paquetes)
  @JoinColumn({name: 'producto_id'})
  producto: Producto;

  @Column()
  cantidad: number;
}