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

  addItem(item: item.Item): boolean {
    this.items[this.getFirstFreeSlot()] = item;
    return true;
  }

  removeItem(index) {
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

  getItemsAsArray(): item.Item[] {
    return Object.values(this.items);
  }

  getRaw() {}

  initFromRaw() {}
}
