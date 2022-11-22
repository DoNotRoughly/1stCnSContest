import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { CourseReturn } from './course.returns';

@Injectable()
export class CourseService {
  resentlabel: string;
  resentvalue: string;

  constructor(
    //생성자
    @InjectRepository(CourseRepository)
    private readonly courseRepository: CourseRepository,
    private dataSource: DataSource,
  ) {
    this.resentlabel = 'major';
    this.resentvalue = '';
  }

  public async countCurrentPeople(courseId: string): Promise<number> {
    // 현재 강의의 수강 인원 수 반환
    const course = await this.courseRepository.findUserListByCourse(courseId);
    const result = course[0].user;
    return result.length;
  }

  public async returnCourse(course: Course): Promise<CourseReturn> {
    // 인원 구해주고, 프론트에서 사용할 데이터 양식으로 dto
    const currentPeople = await this.countCurrentPeople(course.courseId);
    return {
      ...course,
      currentPeople,
    };
  }

  public async returnCourseList(courses: Course[]) {
    // 바뀐 데이터 양식의 배열로 반환
    const result = [];
    for (const course of courses) {
      result.push(await this.returnCourse(course));
    }
    return result;
  }

  async getCourseById(courseId: string) {
    // course id로 강좌 찾기.
    return await this.courseRepository.findOneBy({ courseId: courseId });
  }

  async addCourse(course: Course) {
    try {
      const alreadyIn = await this.getCourseById(course.courseId);
      if (alreadyIn) {
        return { status: 400, message: '이미 등록되어 있는 강의입니다.' };
      }
      const result = await this.courseRepository.save(course);
      console.log(course);
      return { status: 201, result };
    } catch (e) {
      console.log(e);
      return { status: 400, message: '오류가 발생했습니다.' };
    }
  }
  async sendEmail(user_list: User[]) {
    return user_list;
  }
  async deleteCourse(courseId: string) {
    try {
      const course = await this.courseRepository.findUserListByCourse(courseId);
      this.sendEmail(course[0].user);
      const result = await this.courseRepository.delete(courseId);
      if (!result.affected) {
        return { status: 400, message: '삭제할 수 없는 강의입니다.' };
      }
      return { status: 201, result };
    } catch (e) {
      return { status: 400, message: '오류가 발생했습니다.' };
    }
  }

  // 필터링 하여 강의 목록 반환
  async filter(label: string, value: string) {
    if (value === '') {
      return await this.courseRepository.find({
        where: {},
      });
    }
    let condition: object = {};
    if (label === 'major') {
      condition = { major: value };
    } else if (label === 'year') {
      condition = { year: value };
    } else if (label === 'professor') {
      condition = { professor: value };
    } else if (label === 'name') {
      condition = { name: value };
    } else if (label === 'courseId') {
      condition = { courseId: value };
    } else {
      return null;
    }
    const result = await this.courseRepository.findBy(condition);

    return result;
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
