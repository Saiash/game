import { Skill } from '../skill';
import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'thaumatology',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

class ThaumatologyClass extends Skill {
  getSpecificValue(): number {
    return (
      this.skillManager.character.perkManager.getByCode('magery')?.getLevel() ||
      0
    );
  }
}

export const Thaumatology = skillFabric({
  skillSettings,
  skillClass: ThaumatologyClass,
});
