import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

const fixedPath: attrsMapType[] = ['attribute'];

export class AttributesModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = fixedPath;

  constructor(store: DataStore) {
    super(store, fixedPath);
  }

  setName(name: string) {
    return this._setValue('name', name);
  }

  getName(): string {
    const [name] = this._getValueAsSet('name'); // set.keys().next().value
    return name;
  }
}
