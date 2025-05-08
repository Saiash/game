import { DataStore } from '../../../engine/models/store/store';
import { BaseEntityModel } from '../../../engine/models/entity/models';
import { Item } from '../../items/item';

export class Inventory extends BaseEntityModel {
  constructor(store: DataStore) {
    super(store, ['inventory']);
  }

  addItem(item: Item) {
    this._addValue('value', `${item.id}`);
  }

  removeItem(item: Item) {
    this._removeValue('value', `${item.id}`);
  }
}
