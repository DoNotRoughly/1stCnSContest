import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';
import { User } from 'src/User/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'DoNotRoughly',
  entities: [User, Course],
  synchronize: false,
};
