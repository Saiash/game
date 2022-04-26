import { Character } from '../characters';
import { Item } from '../characters/inventory/item';

const MAX_LENGTH = 10;

export type Event = {
  text: string;
  source: Character | Item | 'System';
};

export class Log {
  events: Event[];

  constructor() {
    this.events = [];
  }

  addEvent({
    source = 'System',
    text,
  }: {
    text: string;
    source?: Character | Item | 'System';
  }) {
    this.events.push({ source, text });
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
