import { Injectable } from '@nestjs/common';
import { ApplyPeriod } from './period.types';
import * as fs from 'fs';

@Injectable()
export class PeriodService {
  period: ApplyPeriod;
  constructor() {
    // 신청 기간 설정
    console.log(`${__dirname}/period.json`);
    try {
      this.period = JSON.parse(
        fs.readFileSync(`${__dirname}/period.json`, 'utf8'),
      );
    } catch (e) {
      // default 시간 설정
      const start = new Date();
      start.setHours(10, 0, 0, 0);
      const end = new Date();
      end.setHours(18, 0, 0, 0);
      this.period = { start: start, end: end };
    }
  }

  getPeriod() {
    return this.period;
  }

  setPeriod(period: ApplyPeriod) {
    console.log(period);
    this.period = period;
    fs.writeFileSync(
      `${__dirname}/period.json`,
      JSON.stringify(this.period),
      'utf8',
    );
    return period;
  }
}
