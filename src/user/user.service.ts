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

  async cancelCourse(userId: string, courseId: string) {
    // 수강 취소입니다.
    try {
      const userarr = await this.userRepository.findCourseListByUser(userId);
      const user = userarr[0];
      if (!user) return { status: 403, message: 'user 정보가 틀렸습니다.' };
      else {
        const tempCourseList = user.course.filter((course) => {
          return course.courseId !== courseId;
        });
        if (tempCourseList.length === user.course.length)
          return { status: 400, message: '삭제되지 않았습니다.' };
        else {
          user.course = tempCourseList;
          await this.dataSource.manager.save(user);
          return { ...user, status: 202 };
        }
      }
    } catch (err) {
      return { status: 500 };
    }
  }

  async applyCourse(userId: string, courseId: string) {
    // 수강 신청입니다.
    try {
      const userarr = await this.userRepository.findCourseListByUser(userId);
      const user = userarr[0];
      if (!user) return { status: 403, message: 'user 정보가 틀렸습니다.' };
      else {
        const newCourse = await this.courseService.getCourseById(courseId);
        let count = newCourse.point;
        // 강의 수강 조건에 맞지 않는 경우
        if (user.year < newCourse.year)
          return { status: 400, message: '수강할 수 없는 학년입니다.' };
        // 수강 목록에 이미 있는 경우
        if (
          user.course.filter((course) => {
            count += course.point;
            return course.courseId === courseId;
          }).length
        )
          return { status: 400, message: '이미 신청한 과목입니다.' };
        // 수강 학점이 9학점이 넘는 경우
        if (count > 9)
          return { status: 400, message: '이수 가능 학점을 초과했습니다.' };

        // 모든 조건을 통과한다면 course 목록에 추가해준따.
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
