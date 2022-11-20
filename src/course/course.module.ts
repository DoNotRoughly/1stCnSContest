import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { TypeOrmExModule } from 'src/typeorm/typeorm-custom-repository.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([Course, CourseRepository])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
