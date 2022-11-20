import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm/typeormCustomRepository';
import { Course } from './course.entity';
import { User } from 'src/User/user.entity';

@CustomRepository(Course)
export class CourseRepository extends Repository<Course> {}
