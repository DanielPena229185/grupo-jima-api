import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Empleado } from './empleado.entity';
import { Tienda } from './tienda.entity';

@Entity({ name: 'tortillerias', schema: 'public' })
export class Tortilleria {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'telefono', unique: true, nullable: false })
  telefono: string;

  @Column({ name: 'nombre', nullable: false })
  nombre: string;

  @Column({ name: 'direccion', nullable: false })
  direccion: string;

  @ManyToMany(() => Empleado, (empleado) => empleado.tortillerias)
  @JoinTable({
    name: 'empleados_tortillerias',
    joinColumn: { name: 'tortilleria_id' },
    inverseJoinColumn: { name: 'empleado_id' },
  })
  empleados: Empleado[];

  @OneToMany(() => Tienda, (tienda) => tienda.tortilleria)
  tiendas: Tienda[];
}
