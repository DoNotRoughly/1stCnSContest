import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { TypeOrmExModule } from 'src/typeorm/typeorm-custom-repository.module';

import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      Course,
      CourseRepository,
      UserRepository,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseService],
})
export class CourseModule {}
