import { perkList } from './type';
import { CharacterPerkModel } from '../../../engine/models/entity/models/characterPerk';
import { StoreMerge } from '../../../engine/models/store/helper/storeMerge';
import { DataStore } from '../../../engine/models/store/store';

export class Perk extends CharacterPerkModel {
  constructor(store: DataStore, data: { code: perkList, rawStruct: string }, level: number) {
    super(store, [data.code]);
    const value = this._getUnsafeValue('value');
    if (!value) {
      this.initDefaultValues(data, level);
    }
  }

  initDefaultValues(data: { code: perkList, rawStruct: string }, level: number) {
    const { code, rawStruct } = data;
    StoreMerge.mergeByRawStruct(this.store, rawStruct);

    this.setName(code);
    this.setValue(level);
  }


}
