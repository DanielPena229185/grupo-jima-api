import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gramajes', schema: 'public' })
export class Gramaje {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'gramaje', type: 'float' })
  gramaje: number;
}
