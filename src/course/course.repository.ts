import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm/typeormCustomRepository';
import { Course } from './course.entity';

@CustomRepository(Course)
export class CourseRepository extends Repository<Course> {
  public filtering(a: number) {
    return a;
  }

  public k = 4;
}
