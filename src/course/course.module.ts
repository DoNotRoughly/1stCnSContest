import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { TypeOrmExModule } from 'src/typeorm/typeorm-custom-repository.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { PeriodModule } from 'src/period/period.module';
import { PeriodService } from 'src/period/period.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      Course,
      CourseRepository,
      UserRepository,
      UserModule,
      PeriodModule,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, UserService, PeriodService],
})
export class CourseModule {}
