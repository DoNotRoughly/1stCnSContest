export interface CourseReturn {
  courseId: string; // 과목번호-분반번호
  name: string; // 과목 이름
  point: number; // 학점
  major: string; // 학과
  year: string; // 학년
  professor: string; // 교수
  maxPeople: number; // 총원
  currentPeople: number; // 현재 신청 인원
}
