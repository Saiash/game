import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'writing',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const Writing = skillFabric({ skillSettings });
