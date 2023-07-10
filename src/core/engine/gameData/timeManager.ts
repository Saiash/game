import { CTX } from '../../../types';
import moment from 'moment';

type expiringEffect = { source: any };

export class TimeManager {
  ctx: CTX;
  currentTime: moment.Moment;
  effects: expiringEffect[] = [];

  constructor({ ctx }: { ctx: CTX }) {
    this.ctx = ctx;
    this.currentTime = moment('1200-06-17T09:24:00');
  }

  calcTimeSpent(seconds: number) {
    this.currentTime.add(seconds, 'seconds');
    //TODO: альтернативная реализация, если будет тормозить: указывать не длительность, а время истечения и просто его проверять.
    //Можно сразу сортровать массив по времени, тогда это будет быстро считаться - как только условие не выполнено, то и дальше не будет выполняться.
    this.reduceExpiringEffectsTime(seconds);
  }

  reduceExpiringEffectsTime(seconds: number) {
    this.effects.forEach((effect, index) => {
      effect.source.length = effect.source.length - seconds;
      if (effect.source.length <= 0) {
        this.effects.splice(index, 1);
      }
    });
  }

  getCurrentTime() {
    return this.currentTime;
  }

  addExpiringEffect(source: any) {
    const length = source.getLength();
    if (length > 0) {
      this.effects.push({ source });
    }
  }
}
