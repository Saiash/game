import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'machinist',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

// Ме- ханика (любая) -5.

export const Machinist = skillFabric(skillSettings);
