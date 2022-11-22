import { Controller, Get, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CourseReturn } from './course.returns';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('filter')
  async filter(@Req() req: Request, @Res() res: Response) {
    console.log(`CALL : /course/filter`);
    const label: string = req.query.label.toString();
    const value: string = req.query.value.toString();
    const result = await this.courseService.filter(label, value);
    if (result === null) {
      return res.status(403);
    }
    return res.status(201).json(CourseService.returnCourseList(result));
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
}
