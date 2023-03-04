import { CTX } from '../../../types';
import moment from 'moment';

export class TimeManager {
  ctx: CTX;
  currentTime: moment.Moment;

  constructor({ ctx }: { ctx: CTX }) {
    this.ctx = ctx;
    this.currentTime = moment('1200-06-17T09:24:00');
  }

  calcTimeSpent(seconds: number) {
    this.currentTime.add(seconds, 'seconds');
  }

  getCurrentTime() {
    return this.currentTime;
  }
}
