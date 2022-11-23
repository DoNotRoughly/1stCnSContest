import { Injectable } from '@nestjs/common';
import { ApplyPeriod } from './period.types';
import * as fs from 'fs';

@Injectable()
export class PeriodService {
  static period: ApplyPeriod;
  constructor() {
    // 신청 기간 설정
    // default 시간 설정
    const start = new Date();
    start.setHours(10, 0, 0, 0);
    const end = new Date();
    end.setHours(18, 0, 0, 0);
    PeriodService.period = {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  }

  getPeriod() {
    return PeriodService.period;
  }

  setPeriod(period: ApplyPeriod) {
    console.log(period);
    PeriodService.period = period;
    return period;
  }
}
