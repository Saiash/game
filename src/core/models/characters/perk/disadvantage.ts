import { CharacterPerkModel } from '../../../engine/models/entity/models/characterPerk';
import { StoreMerge } from '../../../engine/models/store/helper/storeMerge';
import { DataStore } from '../../../engine/models/store/store';
import { disadvantageList } from './type';

export type rawDisadvantageModel = {
  name: string;
  code: disadvantageList;
  description: string;
  level: number;
  tags: string;
};

export class Disadvantage extends CharacterPerkModel {
  constructor(store: DataStore, data: { code: disadvantageList, rawStruct: string }, level: number) {
    super(store, [data.code]);
    const value = this._getUnsafeValue('value');
    if (!value) {
      this.initDefaultValues(data, level);
    }
  }

  initDefaultValues(data: { code: disadvantageList, rawStruct: string }, level: number) {
    const { code, rawStruct } = data;
    StoreMerge.mergeByRawStruct(this.store, rawStruct);

    this.setName(code);
    this.setValue(level);
  }
}
