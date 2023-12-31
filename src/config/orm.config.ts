import { ConnectionOptions } from 'typeorm';
import { env } from './env.config';

const configDB: ConnectionOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: ['dist/**/*.entity.{ts,js}'],
  synchronize: true,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
export = configDB;
