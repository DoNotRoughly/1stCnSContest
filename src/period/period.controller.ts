import { Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PeriodService } from './period.service';

@Controller('course')
export class PeriodController {
  constructor(private readonly courseService: PeriodService) {}
}
