import { Injectable } from '@nestjs/common';
import { ApplyPeriod } from './period.types';
import * as fs from 'fs';

@Injectable()
export class PeriodService {
  static period: ApplyPeriod;
  constructor() {
    console.log(`${__dirname}/period.json`);
    try {
      PeriodService.period = JSON.parse(
        fs.readFileSync(`${__dirname}/period.json`, 'utf8'),
      );
    } catch {}
  }

  getPeriod() {
    return PeriodService.period;
  }

  setPeriod(period: ApplyPeriod) {
    console.log(period);
    PeriodService.period = period;
    fs.writeFileSync(
      `${__dirname}/period.json`,
      JSON.stringify(PeriodService.period),
      'utf8',
    );
    return period;
  }
}
