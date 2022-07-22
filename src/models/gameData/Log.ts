import { CTX } from '../../types';
import { Character } from '../characters';
import { Item } from '../characters/inventory/item';

const MAX_LENGTH = 10;

export type Event = {
  id: number;
  time: string;
  text: string;
  source: Character | Item | 'System';
};

let id = 0;

export class Log {
  events: Event[];
  ctx: CTX;

  constructor(ctx: CTX) {
    this.ctx = ctx;
    this.events = [];
  }

  addEvent({
    source = 'System',
    text,
  }: {
    text: string;
    source?: Character | Item | 'System';
  }) {
    const time = this.ctx.gameData.timeManager
      .getCurrentTime()
      .format('hh:mm:ss');
    this.events.push({ id: id++, source, text, time });
    if (this.events.length > MAX_LENGTH) {
      this.removeEvent();
    }
  }

  removeEvent() {
    this.events.shift();
  }

  getEvents(): Event[] {
    return this.events;
  }
}
