import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { CourseReturn } from './course.returns';

@Injectable()
export class CourseService {
  resentFiltered: Course[];
  resentlabel: string;
  resentvalue: string;

  constructor(
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository,
  ) {
    this.resentlabel = 'major';
    this.resentvalue = '';
  }

  static returnCourse(course: Course): CourseReturn {
    return {
      courseId: course.courseId,
      name: course.name,
      point: course.point,
      major: course.major,
      year: course.year,
      professor: course.professor,
      maxPeople: course.maxPeople,
      currentPeople: JSON.parse(course.studentIds).length,
    };
  }

  static returnCourseList(courses: Course[]): CourseReturn[] {
    const result: CourseReturn[] = [];
    courses.map((course) => result.push(CourseService.returnCourse(course)));
    console.log(result);
    return result;
  }

  async getCourseById(courseId: string) {
    return this.courseRepository.findOneBy({ courseId: courseId });
  }

  async getCourseListByIds(courseIds: string[]) {
    const result: Course[] = [];
    courseIds.map(async (courseId) => {
      result.push(await this.getCourseById(courseId));
    });
    return result;
  }

  // 필터링 하기
  async filter(label: string, value: string): Promise<Course[]> {
    if (value === '') {
      return this.courseRepository.find({
        where: {},
      });
    }

    if (label === 'major') {
      this.resentFiltered = await this.courseRepository.findBy({
        major: value,
      });
    } else if (label === 'year') {
      this.resentFiltered = await this.courseRepository.findBy({
        year: value,
      });
    } else if (label === 'professor') {
      this.resentFiltered = await this.courseRepository.findBy({
        professor: value,
      });
    } else if (label === 'name') {
      this.resentFiltered = await this.courseRepository.findBy({
        name: value,
      });
    } else if (label === 'courseId') {
      this.resentFiltered = await this.courseRepository.findBy({
        courseId: value,
      });
    } else {
      return null;
    }

    return this.resentFiltered;
  }

  // 과목 정보 수정
  async modify(data: Course): Promise<Course[]> {
    if (data.professor === '') return null;
    if (data.name === '') return null;

    this.courseRepository.update({ courseId: data.courseId }, data);
    return await this.filter(this.resentlabel, this.resentvalue);
  }
}
