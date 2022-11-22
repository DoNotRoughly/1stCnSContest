import { User } from 'src/user/user.entity';
import { Column, Entity, BaseEntity, PrimaryColumn, ManyToMany } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @PrimaryColumn('uuid')
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

  @ManyToMany(() => User, (user) => user.course)
  user: User[]; // 현재 신청 인원의 학번들, 리스트를 stringfy 해서 저장
}
