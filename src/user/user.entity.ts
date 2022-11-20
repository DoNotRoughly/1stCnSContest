import e from 'express';
import { Course } from 'src/course/course.entity';
import {
  Column,
  Entity,
  PrimaryColumn,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity({ schema: 'DoNotRoughly', name: 'User' })
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string; // 학번 혹은 관리자번호

  @Column({ type: 'varchar' })
  pw: string; // 비밀번호

  @Column({ type: 'varchar' })
  type: string; // 관리자/학생

  @Column({ type: 'char', nullable: true })
  year: string; // 학년

  @Column({ type: 'varchar', nullable: true })
  name: string; // 이름

  @Column({ type: 'varchar', nullable: true })
  email: string; // 이메일

  @ManyToMany(() => Course, (course) => course.courseId)
  @JoinTable()
  course?: Course[]; // 신청한 과목 번호 리스트
}
