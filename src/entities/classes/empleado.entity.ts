import { Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tortilleria } from './tortilleria.entity';
import { Usuario } from './usuario-entity';

@Entity({ name: 'empleados', schema: 'public' })
export class Empleado extends Usuario {
  @ManyToMany(() => Tortilleria, (tortilleria) => tortilleria.empleados)
  @JoinTable({ 
    name: 'empleados_tortillerias',
    joinColumn: { name: 'empleado_id' },
    inverseJoinColumn: { name: 'tortilleria_id' }, 
  })
  tortillerias: Tortilleria[];
}