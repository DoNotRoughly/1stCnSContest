import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/User/user.entity';
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
      currentPeople: 0, //JSON.parse(course.studentIds).length,
    };
  }

  static returnCourseList(courses: Course[]): CourseReturn[] {
    const result: CourseReturn[] = [];
    courses.map((course) => result.push(CourseService.returnCourse(course)));
    return result;
  }

  async getCourseById(courseId: string) {
    // course id로 강좌 찾기.
    return await this.courseRepository.findOneBy({ courseId: courseId });
  }

  public async getCourseListId(courseList: Course[]) {
    const result = courseList.map(async (course) => {
      await this.getCourseById(course.courseId);
    });
    return result;
  }
  // 필터링 하여 강의 목록 반환
  async filter(label: string, value: string) {
    if (value === '') {
      return await this.courseRepository.find({
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
  async modify(data: CourseReturn): Promise<Course[]> {
    if (data.professor === '') return null;
    if (data.name === '') return null;
    if (data.maxPeople === 0) return null;

    const tmp = await this.courseRepository.findOneBy({
      courseId: data.courseId,
    });

    await this.courseRepository.update(
      { courseId: data.courseId },
      {
        ...tmp,
        professor: data.professor,
        name: data.name,
        maxPeople: data.maxPeople,
      },
    );

    return await this.filter(this.resentlabel, this.resentvalue);
  }
}
