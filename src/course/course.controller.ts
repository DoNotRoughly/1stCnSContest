import { Controller, Get, Param, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
}
