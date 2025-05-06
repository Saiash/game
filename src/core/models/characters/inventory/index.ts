import { Character } from '..';
import { Item } from '../../items/item';
import { DataStore } from '../../../engine/models/store/store';
import { BaseEntityModel } from '../../engine/models/entity/models/entity';
import { Weight } from '../attributes/models/weight';

export class Inventory extends BaseEntityModel {
  private items: Item[] = [];
  private character: Character;

  constructor(character: Character, store: DataStore) {
    super(store, ['inventory']);
    this.character = character;
  }

  addItem(item: Item): void {
    this.items.push(item);
    this._setValue('items', this.items);
  }

  removeItem(index: number): Item | undefined {
    const item = this.items.splice(index, 1)[0];
    this._setValue('items', this.items);
    return item;
  }

  getItem(index: number): Item | undefined {
    return this.items[index];
  }

  getItems(): Item[] {
    return this.items;
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
    this.character?.secondaryAttributes
      .getByCode<Weight>('weight')
      .addWeight(item.getWeight());
    return true;
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

  getRaw() { }

  initFromRaw() { }
}
