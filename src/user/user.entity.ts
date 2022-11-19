import { Course } from 'src/course/course.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity({ schema: 'DoNotRoughly', name: 'User' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: string; // 학번 혹은 관리자번호

  @Column()
  type: string;

  @Column({})
  year: string; // 학년

  @Column({})
  name: string; // 이름

  @Column({})
  email: string; // 이메일

  @OneToMany(() => Course, (course) => course.courseId)
  applicated?: Course[]; // 신청한 과목 번호 리스트
}
