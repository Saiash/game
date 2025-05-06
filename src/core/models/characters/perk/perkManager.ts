import { Perk } from './perk';
import { PERK_LIST, perkList } from './type';
import { DataStore } from '../../../engine/models/store/store';
import { BaseEntityModel } from '../../../engine/models/entity/models';


export class PerkManager extends BaseEntityModel {
  private collection = new Map<perkList, Perk>();

  constructor(store: DataStore) {
    super(store, ['perks']);
  }

  async add({
    name,
    level = 0,
  }: {
    name: perkList;
    level?: number;
  }) {
    if (this.collection.has(name)) return false;
    const perk = new Perk(this.store, PERK_LIST[name], level);
    this.collection.set(name, perk);
    return this;
  }

  getByCode(code: perkList): Perk | undefined {

    return this.collection.get(code);
  }

}
