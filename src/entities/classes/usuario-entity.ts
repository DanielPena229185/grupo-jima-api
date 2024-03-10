import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Usuario {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'codigo_empleado', unique: true, nullable: false })
  codigoEmpleado: number;

  @Column({ name: 'telefono', unique: true, nullable: false })
  telefono: string;

  @Column({ name: 'nombres', nullable: false })
  nombres: string;

  @Column({ name: 'apellidos', nullable: false })
  apellidos: string;
}
