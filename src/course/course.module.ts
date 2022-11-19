import { Module } from '@nestjs/common';
import { UserController } from './course.controller';
import { UserService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [UserController],
  providers: [UserService],
})
export class CourseModule {}
