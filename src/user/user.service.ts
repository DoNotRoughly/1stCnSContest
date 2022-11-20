import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

const startTime = null;
const finishTime = null;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private courseService: CourseService,
    private dataSource: DataSource,
  ) {}
  async loginInfo(userId: string, pw: string) {
    // 로그인입니다.
    try {
      const result = await this.userRepository.findCourseListByUser(userId);
      if (result[0].pw === pw) return { ...result[0], status: 201 };
      else return { status: 400 };
    } catch (err) {
      // 서버 에러
      return { status: 500 };
    }
  }

  async applyCourse(userId: string, courseId: string) {
    // 수강 신청입니다.
    try {
      const userarr = await this.userRepository.findCourseListByUser(userId);
      if (!userarr[0]) return { status: 400 };
      else {
        const newCourse = await this.courseService.getCourseById(courseId);
        const user = userarr[0];
        let count = newCourse.point;
        if (
          // 수강 가능한지 확인하는 조건문
          // 수강 목록에 있거나
          user.course.filter((course) => {
            count += course.point;
            return course.courseId === courseId;
          }).length >= 1 ||
          // 수강 학점이 9학점이 넘거나
          count > 9
        )
          return { status: 400 };
        // 목록에 없다면 course 목록에 추가해준따.
        user.course.push(newCourse);
        await this.dataSource.manager.save(user);
        // TODO:: courseid로 강좌 가져와서 유저 데이터에 합쳐서 객체 배열로 전달
        return { ...user, status: 201 };
      }
    } catch (err) {
      // 서버 에러
      return { status: 500 };
    }
  }
}
