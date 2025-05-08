
import { BaseEntityModel } from '.';
import { bodyPartsList } from '../../../../models/characters/doll/types';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

export class CharacterBodyPartModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = [];

  constructor(store: DataStore, fixedPath: bodyPartsList[]) {
    super(store, ['doll', ...fixedPath]);
    this.fixedPath = ['doll', ...fixedPath];
  }

  setName(name: string) {
    return this._setValue('name', name);
  }

  getName(): string {
    const [name] = this._getValueAsSet('name');
    return name;
  }

  setInnerLayer(itemId: number) {
    return this._setValue('innerLayer', `${itemId}`);
  }

  getLayer1(): number {
    const [itemId] = this._getValueAsSet('innerLayer');
    return parseInt(itemId);
  }

  setMiddleLayer(itemId: number) {
    return this._setValue('middleLayer', `${itemId}`);
  }

  getMiddleLayer(): number {
    const [itemId] = this._getValueAsSet('middleLayer');
    return parseInt(itemId);
  }

  setOuterLayer(itemId: number) {
    return this._setValue('outerLayer', `${itemId}`);
  }

  getOuterLayer(): number {
    const [itemId] = this._getValueAsSet('outerLayer');
    return parseInt(itemId);
  }


}
