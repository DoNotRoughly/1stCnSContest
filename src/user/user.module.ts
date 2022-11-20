import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmExModule } from 'src/typeorm/typeorm-custom-repository.module';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CourseRepository } from 'src/course/course.repository';
import { CourseService } from 'src/course/course.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, CourseRepository]),
  ],
  controllers: [UserController],
  providers: [UserService, CourseService],
})
export class UserModule {}
