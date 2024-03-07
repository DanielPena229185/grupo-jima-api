import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localHost',
  port: 3306,
  username: 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: 'grupojima',
  //synchronize: true //Solo quitar comentario si quieren reiniciar la base de datos
};
