import { Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Course } from './course.entity';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('filter')
  async filter(@Req() req: Request, @Res() res: Response) {
    const label: string = req.query.label.toString();
    const value: string = req.query.value.toString();
    const result = await this.courseService.filter(label, value);
    if (result === null) {
      return res.status(403).json(result);
    }
    return res.status(201).json(result);
  }

  @Patch('modify')
  async modify(@Req() req: Request, @Res() res: Response) {
    const data: Course = JSON.parse(req.query.data.toString());
    const result = await this.courseService.modify(data);
    if (result === null) {
      return res.status(403).json(result);
    }
    return res.status(201).json(result);
  }
}
