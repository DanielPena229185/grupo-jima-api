import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gramajes', schema: 'public' })
export class Gramaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  gramaje: number;
}
