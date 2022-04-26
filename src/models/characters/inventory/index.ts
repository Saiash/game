import { Character } from '..';
import { CTX } from '../../../types';
import { item } from '../../index';
import { Item } from './item';

export class Inventory {
  items: { [index: number]: item.Item };
  character: Character;
  ctx: CTX;

  constructor({
    character,
    items,
    ctx,
  }: {
    character: Character;
    ctx: CTX;
    items?: { [index: number]: item.Item };
  }) {
    this.ctx = ctx;
    this.items = items || {};
    this.character = character;
  }

  getFirstFreeSlot() {
    let index = 0;
    let freeSlot = false;
    while (index < 1000 && !freeSlot) {
      if (!this.items[index]) {
        freeSlot = true;
      } else {
        index++;
      }
    }
    return index;
  }

  add(item: item.Item): boolean {
    this.items[this.getFirstFreeSlot()] = item;
    item.owner = this.character;
    return true;
  }

  removeItem(index: number) {
    if (this.items[index]) {
      this.items[index].setOwner(undefined);
      delete this.items[index];
    }
  }

  getItem(index: number): item.Item {
    return this.items[index];
  }

  moveItem(fromIndex: number, toIndex: number) {
    const temp = this.items[toIndex];
    delete this.items[toIndex];
    this.items[toIndex] = this.items[fromIndex];
    delete this.items[fromIndex];
    this.items[fromIndex] = temp;
  }

  getAsArray(): [number, item.Item][] {
    return Object.entries(this.items).map(i => {
      return [parseInt(i[0]), i[1]];
    });
  }

  getRaw() {}

  initFromRaw() {}
}
