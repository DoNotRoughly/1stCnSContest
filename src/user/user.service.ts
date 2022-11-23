import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
import { PeriodService } from 'src/period/period.service';
import { ApplyPeriod } from 'src/period/period.types';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private courseService: CourseService,
    private periodService: PeriodService,
    private dataSource: DataSource,
  ) {}
  async loginInfo(userId: string, pw: string) {
    // 로그인입니다.
    try {
      const rep_result = await this.userRepository.findCourseListByUser(userId);
      const result = rep_result[0];
      const save_pw = result.pw;
      delete result.pw;
      if (save_pw === pw) return { result, status: 201 };
      else return { status: 400 };
    } catch (err) {
      // 서버 에러
      return { status: 500 };
    }
  }

  async cancelCourse(userId: string, courseId: string) {
    // 수강 취소입니다. 두 개체간의 연결을 끊습니다.
    try {
      const userarr = await this.userRepository.findCourseListByUser(userId);
      const user = userarr[0];
      delete user.pw;
      if (!user) return { status: 403, message: 'user 정보가 틀렸습니다.' };
      else {
        const tempCourseList = user.course.filter((course) => {
          return course.courseId !== courseId;
        });
        if (tempCourseList.length === user.course.length)
          return { status: 400, message: '삭제되지 않았습니다.' };
        else {
          user.course = tempCourseList;
          const course_return = this.courseService.returnCourseList(
            user.course,
          );

          await this.dataSource.manager.save(user);
          return {
            user: {
              ...user,
              course: course_return,
            },
            status: 202,
          };
        }
      }
    } catch (err) {
      return { status: 500 };
    }
  }

  // 수강신청 예외처리 함수
  private conditionToApply(
    course: Course,
    user: User,
    courseId: string,
    count: number,
    app_period: ApplyPeriod,
  ) {
    let total_point: number = course.point;
    const now_date: Date = new Date();
    // 신청 가능 시간인지 확인해주는 경우
    if (app_period.start > now_date || app_period.end < now_date) {
      return { status: 400, message: '신청 가능 기간이 아닙니다.' };
    }
    // 강의 수강 조건에 맞지 않는 경우
    if (user.year < course.year)
      return { status: 400, message: '수강할 수 없는 학년입니다.' };
    // 수강 목록에 이미 있는 경우
    if (
      user.course.filter((course) => {
        total_point += course.point;
        return course.courseId === courseId;
      }).length
    )
      return { status: 400, message: '이미 신청한 과목입니다.' };
    // 수강 학점이 9학점이 넘는 경우
    if (total_point > 9)
      return { status: 400, message: '이수 가능 학점을 초과했습니다.' };
    // 수강 인원을 넘긴 경우
    if (count === course.maxPeople) {
      return { status: 400, message: '수강 인원을 초과했습니다.' };
    }
    return { status: 200, message: '' };
  }

  async applyCourse(userId: string, courseId: string) {
    // 수강 신청입니다.
    try {
      const app_period: ApplyPeriod = this.periodService.getPeriod();
      const userarr = await this.userRepository.findCourseListByUser(userId);
      const user = userarr[0];
      delete user.pw;
      if (!user) return { status: 403, message: 'user 정보가 틀렸습니다.' };
      else {
        const newCourse = await this.courseService.getCourseById(courseId);
        const people_count = await this.courseService.countCurrentPeople(
          courseId,
        );
        // 수강신청 조건을 만족하는지 판단하는 변수
        const condition_return_value: { status: number; message: string } =
          this.conditionToApply(
            newCourse,
            user,
            courseId,
            people_count,
            app_period,
          );
        // 조건을 만족하지 못하면 해당 조건의 status, message 반환
        if (condition_return_value.status === 400) {
          return condition_return_value;
        }
        // 모든 조건을 통과한다면 관계에 추가해준따.
        user.course.push(newCourse);
        const course_return = this.courseService.returnCourseList(user.course);
        await this.dataSource.manager.save(user);
        // TODO:: courseid로 강좌 가져와서 유저 데이터에 합쳐서 객체 배열로 전달
        return {
          user: {
            ...user,
            course: course_return,
          },
          status: 201,
        };
      }
    } catch (err) {
      // 서버 에러
      return { status: 500, message: '잘못된 입력입니다.' };
    }
  }
}
