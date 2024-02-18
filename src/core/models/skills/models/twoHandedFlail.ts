import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'twoHandedFlail',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { kusari: -4, twoHandedAxeMace: -4 },
};

export const TwoHandedFlail = skillFabric(skillSettings);
