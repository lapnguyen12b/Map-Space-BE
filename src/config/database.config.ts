import * as configDB from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const dataBaseConfig = TypeOrmModule.forRoot(configDB)