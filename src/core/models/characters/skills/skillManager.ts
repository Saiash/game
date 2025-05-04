import { Skill } from './skill';
import { SKILL_LIST, skillList } from '.';
import { DataStore } from '../../../engine/models/store/store';
import { SkillsModel } from '../../../engine/models/entity/models/skills';

export class SkillManager extends SkillsModel {
  private collection = new Map<skillList, Skill>();

  constructor(store: DataStore) {
    super(store);
  }

  getByCode(code: skillList): Skill {
    const skill = this.collection.get(code);
    if (!skill) {
      const newModel = new Skill(this.store, SKILL_LIST[code]);
      this.collection.set(code, newModel);
      return newModel;
    }
    return skill;
  }

}
