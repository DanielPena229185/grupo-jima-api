import { Entity, ManyToMany, JoinTable, Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Tortilleria } from './tortilleria.entity';
import { UsuarioRol } from '../enums/usuario-roles-enum';

@Entity({ name: 'empleados', schema: 'public' })
@TableInheritance({ column: {
  name: 'tipo',
  enum: UsuarioRol
} })
export class Empleado {

  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'codigo_empleado', unique: true, nullable: false })
  codigoEmpleado: string;

  @Column({ name: 'telefono', unique: true, nullable: false })
  telefono: string;

  @Column({ name: 'nombres', nullable: false })
  nombres: string;

  @Column({ name: 'apellidos', nullable: false })
  apellidos: string;

  @Column({ name: 'tipo', nullable: false })
  tipo: UsuarioRol;

  @ManyToMany(() => Tortilleria, (tortilleria) => tortilleria.empleados)
  @JoinTable({
    name: 'empleados_tortillerias',
    joinColumn: { name: 'empleado_id' },
    inverseJoinColumn: { name: 'tortilleria_id' },
  })
  tortillerias: Tortilleria[];
}