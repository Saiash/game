import { Disadvantage } from './disadvantage';
import { DISADVANTAGE_LIST, disadvantageList } from './type';
import { DataStore } from '../../../engine/models/store/store';
import { BaseEntityModel } from '../../../engine/models/entity/models';

export class DisadvantagesManager extends BaseEntityModel {
  private collection = new Map<disadvantageList, Disadvantage>();

  constructor(store: DataStore) {
    super(store, ['disadvantages']);
  }

  async add({
    name,
    level = 0,
  }: {
    name: disadvantageList;
    level?: number;
  }): Promise<boolean> {
    if (this.collection.has(name)) return false;
    const disadvantage = new Disadvantage(this.store, DISADVANTAGE_LIST[name], level);
    this.collection.set(name, disadvantage);
    return true;
  }

  getByCode(code: disadvantageList): Disadvantage | undefined {
    return this.collection.get(code);
  }
}
