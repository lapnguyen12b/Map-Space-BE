import { User } from 'src/user/entity';
import { ConnectionOptions } from 'typeorm';
import { env } from 'src/config/env.config';

const configDB: ConnectionOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password:  env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [User],
  synchronize: true,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}
export = configDB