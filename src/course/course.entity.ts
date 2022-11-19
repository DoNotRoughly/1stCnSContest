import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Board extends BaseEntity {
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

  @Column()
  studentIds: string[]; // 현재 신청 인원의 학번들
}

export interface Course {
  major: string; // 학과
  name: string; // 과목 이름
  maxPeople: number; // 총원
  studentIds: string[]; // 현재 신청 인원의 학번들
}
