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
      const result = await this.userRepository.findOneByUserId(userId);
      if (result.pw === pw) return { ...result, status: 201 };
      else return { status: 400 };
    } catch (err) {
      // 서버 에러
      return { status: 500 };
    }
  }

  async applyCourse(userId: string, courseId: string) {
    // 수강 신청입니다.
    try {
      const user = await this.userRepository.findOneByUserId(userId);
      if (!!user) return { status: 400 };
      else {
        const newCourse = await this.courseService.getCourseById(courseId);
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
