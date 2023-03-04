import { Character } from '..';
import { CTX } from '../../../../types';
import { Item } from './item';
import { ObjectModel } from '../../../models/locations/object';

export class Inventory {
  items: { [index: number]: Item };
  character?: Character;
  container?: ObjectModel;
  ctx: CTX;

  constructor({
    character,
    container,
    items,
    ctx,
  }: {
    character?: Character;
    container?: ObjectModel;
    ctx: CTX;
    items?: { [index: number]: Item };
  }) {
    this.ctx = ctx;
    this.items = items || {};
    this.character = character;
    this.container = container;
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

  add(item: Item): boolean {
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

  getItem(index: number): Item {
    return this.items[index];
  }

  moveItem(fromIndex: number, toIndex: number) {
    const temp = this.items[toIndex];
    delete this.items[toIndex];
    this.items[toIndex] = this.items[fromIndex];
    delete this.items[fromIndex];
    this.items[fromIndex] = temp;
  }

  getAsArray(): [number, Item][] {
    return Object.entries(this.items).map(i => {
      return [parseInt(i[0]), i[1]];
    });
  }

  getRaw() {}

  initFromRaw() {}
}
