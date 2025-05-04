import { skillList } from './models';
import { CharacterSkillModel } from '../../../engine/models/entity/models/characterSkill';
import { DataStore } from '../../../engine/models/store/store';
import { getLocalisedText } from '../../../../translations';
import { StoreMerge } from '../../../engine/models/store/helper/storeMerge';
import { Character } from '..';
import { characterAttrsCodesList } from '../../../engine/models/store/types';

export class Skill extends CharacterSkillModel {
  private character: Character;

  constructor(store: DataStore, data: { code: skillList, rawStruct: string }, character: Character) {
    super(store, [data.code]);
    this.character = character;
    const value = this._getUnsafeValue('value');
    if (!value) {
      this.initDefaultValues(data);
    }
  }

  initDefaultValues(data: { code: skillList, rawStruct: string }) {
    const { code, rawStruct } = data;
    StoreMerge.mergeByRawStruct(this.store, rawStruct);

    this.setName(code);
    this.setModificationValue(0);
    this.setValue(0);
  }

  _getName() {
    return getLocalisedText('eng', [
      'skill',
      this.getName(),
      'name',
    ]);
  }

  _getDescription() {
    return getLocalisedText('eng', [
      'skill',
      this.getName(),
      'description',
    ]);
  }

  getEffectiveValue(): number {
    return (
      this.getRawValue() +
      this.getExpMod() +
      this.getModsValue() +
      this.getSpecificValue()
    );
  }

  getSpecificValue(): number {
    return 0;
  }

  getBaseRawValue(): number {
    const attrValue = this.getValue();
    return attrValue > 20 ? 20 : attrValue - this.diffMod().value;
  }

  getRawValue(): number {
    const relatedSkillsMap = this.getRelatedSkills();
    const relatedSkillsList = Array.from(relatedSkillsMap.keys()) as skillList[];

    const thisExp = this.getValue();
    const relativeSkillValue = relatedSkillsList.reduce((value, skillCode) => {
      const relatedSkillModel = this.store.getByPath(['object', 'character', 'skills', skillCode, 'value']);

      const skillExp = relatedSkillModel instanceof Map ? parseInt(relatedSkillModel.get('value') as unknown as string) : 0;
      const newValue = skillExp > thisExp ? skillExp : 0;
      return newValue > value ? newValue : value;
    }, 0);

    const relativeAttrCode = this.getRelatedAttribute();
    const _attrValue = this.getAttrValue(relativeAttrCode);
    const attrValue = _attrValue > 20 ? 20 : _attrValue;
    const baseValue =
      attrValue > relativeSkillValue ? attrValue : relativeSkillValue;

    return baseValue - this.diffMod().value;
  }

  getExpMod(): number {
    const exp = this.getValue();
    if (exp <= 0) return -4;
    if (exp >= 1 && exp < 2) return 0;
    if (exp >= 2 && exp < 3) return 1;
    if (exp >= 3 && exp < 4) return 1.5;
    return 2 + (exp - 4) / 4;
  }

  private getAttrValue(attr: characterAttrsCodesList) {
    return this.character.attributeManager.getByCode(attr).getValue();
  }

  diffMod(): { difficulty: string; value: number } {
    let value = 0;
    const difficulty = this.getDifficulty();
    switch (difficulty) {
      case 'easy':
        value = 0;
        break;

      case 'medium':
        value = 1;
        break;

      case 'hard':
        value = 2;
        break;

      case 'very hard':
        value = 3;
        break;
    }
    return { difficulty: difficulty, value };
  }

  getModsValue(): number {
    return this.getModificationValue();
  }

  showValue(): string {
    let text = 'Забытые / редко используемые';
    const skillValue = Math.floor(this.getEffectiveValue());
    switch (skillValue) {
      case 10:
      case 11:
      case 12:
      case 13:
        text = 'Обычный навык';
        break;

      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        text = 'Эксперт';
        break;

      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        text = 'Мастер';
        break;

      default:
        break;
    }
    return text;
  }
}
