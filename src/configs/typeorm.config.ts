import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';
import { User } from 'src/user/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Qwer1234!@',
  database: 'DoNotRoughly',
  entities: [User, Course],
  synchronize: false,
};
