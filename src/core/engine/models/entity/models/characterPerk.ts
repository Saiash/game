import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

export class CharacterPerkModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = [];

  constructor(store: DataStore, fixedPath: attrsMapType[]) {
    super(store, ['skills', ...fixedPath]);
    this.fixedPath = ['skills', ...fixedPath];
  }

  setName(name: string) {
    return this._setValue('name', name);
  }

  getName(): string {
    const [name] = this._getValueAsSet('name');
    return name;
  }

  getValue(): number {
    const [value] = this._getValueAsSet('value');
    return parseInt(value) as number;
  }

  setValue(value: string | number) {
    return this._setValue('value', `${value}`);
  }
}
