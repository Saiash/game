import { BaseEntityModel } from '.';
import { skillList } from '../../../../models/characters/skills/models';
import { DataStore } from '../../store/store';
import { attrsMapType, characterAttrsCodesList, dataAttribute, dataValue } from '../../store/types';

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
    const [name] = this._getRawValue('name');
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

  getRelatedAttribute(): characterAttrsCodesList {
    const [attribute] = this._getRawValue('attribute');
    return attribute as characterAttrsCodesList;
  }

  getDifficulty(): string {
    const [difficulty] = this._getRawValue('difficulty');
    return difficulty;
  }

  getTime(): number {
    const [time] = this._getRawValue('time');
    return parseInt(time) as number;
  }

  getCultureBased(): boolean {
    const cultureBased = this._getUnsafeValue('cultureBased');
    if (!cultureBased) return false;
    if (cultureBased instanceof Map) {
      throw new Error(`no correct value parsed, ${cultureBased}, cultureBased`);
    }
    const [value] = cultureBased;
    return value === 'да';
  }

  getRelatedSkills(): dataAttribute {
    const relatedSkills = this._getValue('relatedSkills');
    if (!relatedSkills || !(relatedSkills instanceof Map)) {
      throw new Error(`no related skills set`);
    }
    return relatedSkills;
  }
}
