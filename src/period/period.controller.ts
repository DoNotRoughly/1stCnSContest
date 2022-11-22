import { Controller, Get, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PeriodService } from './period.service';
import { ApplyPeriod } from './period.types';

@Controller('period')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Patch()
  async set(@Req() req: Request, @Res() res: Response) {
    const peroid: ApplyPeriod = JSON.parse(Object(req.body.params.period));
    const result = this.periodService.setPeriod(peroid);
    if (result === null) {
      return res.status(403);
    }
    return res.status(201).json(result);
  }

  @Get()
  async get(@Req() req: Request, @Res() res: Response) {
    const result = this.periodService.getPeriod();
    if (result === null) {
      return res.status(403);
    }
    return res.status(201).json(result);
  }
}
