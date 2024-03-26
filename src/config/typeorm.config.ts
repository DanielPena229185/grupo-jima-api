import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: 'grupojima',
  autoLoadEntities: true,
  synchronize: true //Solo quitar comentario si quieren reiniciar la base de datos
};
