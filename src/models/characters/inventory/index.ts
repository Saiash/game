import { item } from '../../index';
import { Item } from './item';

export class Inventory {
  items: { [index: number]: item.Item };

  constructor(items?: { [index: number]: item.Item }) {
    this.items = items || {};
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
    return true;
  }

  removeItem(index: number) {
    if (this.items[index]) delete this.items[index];
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
