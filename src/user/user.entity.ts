import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: string; // 학번 혹은 관리자번호

  @Column()
  type: string;

  @Column({ unsigned: true })
  year: string; // 학년

  @Column({ unsigned: true })
  name: string; // 이름

  @Column({ unsigned: true })
  email: string; // 이메일

  @Column()
  applicated?: string[]; // 신청한 과목 번호 리스트
}
