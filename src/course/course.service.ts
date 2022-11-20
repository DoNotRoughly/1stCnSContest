import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository,
  ) {}

  async filter(label: string, value: string) {
    if (label === 'major') {
      return this.courseRepository.findBy({
        major: value,
      });
    } else if (label === 'year') {
      return this.courseRepository.findBy({
        year: value,
      });
    } else if (label === 'professor') {
      return this.courseRepository.findBy({
        professor: value,
      });
    } else if (label === 'name') {
      return this.courseRepository.findBy({
        name: value,
      });
    } else if (label === 'courseId') {
      return this.courseRepository.findBy({
        courseId: value,
      });
    } else {
      return null;
    }

    // return 3;
  }
}
