import { CTX } from '../../../types';
import { Character } from '../../models/characters';
import { Item } from '../../models/characters/inventory/item';

const MAX_LENGTH = 10;

export type LogEvent = {
  id: number;
  time: string;
  text: string;
  source: Character | Item | 'System';
};

let id = 0;

export class Log {
  events: LogEvent[];
  actions: LogEvent[];
  ctx: CTX;

  constructor(ctx: CTX) {
    this.ctx = ctx;
    this.events = [];
    this.actions = [];
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

  addAction({
    source = 'System',
    text,
  }: {
    text: string;
    source?: Character | Item | 'System';
  }) {
    const time = this.ctx.gameData.timeManager
      .getCurrentTime()
      .format('hh:mm:ss');
    this.actions.push({ id: id++, source, text, time });
  }

  clearActions(): void {
    this.actions = [];
  }

  removeEvent() {
    this.events.shift();
  }

  getEvents(): LogEvent[] {
    return this.events;
  }

  getActions(): LogEvent[] {
    return this.actions;
  }
}
