import { User } from 'src/User/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  courseId: string;

  @Column()
  name: string; // 과목 이름

  @Column()
  point: number; // 학점

  @Column()
  major: string; // 학과

  @Column()
  year: string; // 학년

  @Column()
  professor: string; // 교수

  @Column()
  maxPeople: number; // 총원

  @OneToMany(() => User, (user) => user.userId)
  studentIds: string[]; // 현재 신청 인원의 학번들
}
