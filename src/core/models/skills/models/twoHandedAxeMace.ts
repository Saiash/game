import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'twoHandedAxeMace',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { spear: -4, twoHandedFlail: -4 },
};

export const TwoHandedAxeMace = skillFabric({ skillSettings });
