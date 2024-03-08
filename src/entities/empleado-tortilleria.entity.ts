import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { Empleado } from './empleado.entity'
import { Tortilleria } from './tortilleria.entity'

@Entity()
export class EmpleadoTortilleria {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Empleado, empleado => empleado.tortillerias)
    @JoinColumn({name: 'empleado_id'})
    empleado: Empleado;
  
    @ManyToOne(() => Tortilleria, tortilleria => tortilleria.empleados)
    @JoinColumn({name: 'tortilleria_id'})
    tortilleria: Tortilleria;
}