import { Entity } from 'typeorm';
import { Usuario } from './usuario-entity';

@Entity({ name: 'repartidores', schema: 'public' })
export class Repartidor extends Usuario {}
