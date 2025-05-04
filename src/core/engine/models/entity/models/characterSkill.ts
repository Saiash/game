import { BaseEntityModel } from '.';
import { DataStore } from '../../store/store';
import { attrsMapType } from '../../store/types';

export class CharacterSkillModel extends BaseEntityModel {
  protected fixedPath: attrsMapType[] = [];

  constructor(store: DataStore, fixedPath: attrsMapType[]) {
    super(store, ['skills', ...fixedPath]);
    this.fixedPath = ['skills', ...fixedPath];
  }

  setName(name: string) {
    return this._setValue('name', name);
  }

  getName(): string {
    const [name] = this._getRawValue('name'); // set.keys().next().value
    return name;
  }

  getValue(): number {
    const [value] = this._getRawValue('value');
    return parseInt(value) as number;
  }

  setValue(value: string | number) {
    return this._setValue('value', `${value}`);
  }

  getModificationValue(): number {
    const values = this._getRawValue('modificator');
    return Array.from(values).reduce((acc, value) => acc + parseInt(value), 0);
  }

  setModificationValue(modificator: string | number) {
    return this._setValue('modificator', `${modificator}`);
  }

  getCurrentValue(): number {
    const [value] = this._getRawValue('currentValue');
    return parseInt(value) as number;
  }

  setCurrentValue(value: string | number) {
    return this._setValue('currentValue', `${value}`);
  }
}
