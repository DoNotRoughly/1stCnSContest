import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm/typeormCustomRepository';
import { Course } from './course.entity';

@CustomRepository(Course)
export class CourseRepository extends Repository<Course> {
  public async findUserListByCourse(id: string) {
    const result = await this.find({
      relations: ['user'],
      where: { courseId: id },
    });
    return result;
  }
}
