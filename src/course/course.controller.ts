import { Controller, Delete, Get, Patch, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CourseReturn } from './course.returns';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('filter')
  async filter(@Req() req: Request, @Res() res: Response) {
    // 필터링하여 강의를 가져오는 함수
    console.log(`CALL : /course/filter`);
    const label: string = req.query.label.toString();
    const value: string = req.query.value.toString();
    const courses = await this.courseService.filter(label, value);
    const result = await this.courseService.returnCourseList(courses);
    if (result === null) {
      return res.status(403);
    }
    return res.status(201).json(result);
  }

  @Patch('modify')
  async modify(@Req() req: Request, @Res() res: Response) {
    const data: CourseReturn = JSON.parse(Object(req.body.params.data));
    const courses = await this.courseService.modify(data);
    const result = await this.courseService.returnCourseList(courses);
    if (result === null) {
      return res.status(403);
    }
    return res.status(201).json(result);
  }

  @Put('')
  async addCourse(@Req() req: Request, @Res() res: Response) {
    const temp = JSON.stringify(req.body.params.course);
    const course = JSON.parse(Object(temp));
    const result = await this.courseService.addCourse(course);
    return res.status(result.status).json(result);
  }
  @Delete('')
  async deleteCourse(@Req() req: Request, @Res() res: Response) {
    const courseId = req.query.courseId as string;
    const result = await this.courseService.deleteCourse(courseId);
    return res.status(result.status).json(result);
  }
}
