import { Skill } from './skill';
import { SKILL_LIST, skillList } from './models';
import { DataStore } from '../../../engine/models/store/store';
import { SkillsModel } from '../../../engine/models/entity/models/skills';
import { Character } from '..';

export class SkillManager extends SkillsModel {
  private collection = new Map<skillList, Skill>();
  private character: Character;

  constructor(character: Character, store: DataStore) {
    super(store);
    this.character = character;
  }

  getByCode(code: skillList): Skill {
    const skill = this.collection.get(code);
    if (!skill) {
      const newModel = new Skill(this.store, SKILL_LIST[code], this.character);
      this.collection.set(code, newModel);
      return newModel;
    }
    return skill;
  }

}
