import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'twoHandedSword',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { forceSword: -4, broadsword: -4 },
};

export const TwoHandedSword = skillFabric({ skillSettings });
