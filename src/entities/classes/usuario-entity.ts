import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Usuario {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  codigoEmpleado: number;

  @Column({ unique: true })
  telefono: number;

  @Column()
  nombre: string;
}
