import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sociology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

// Антропо- логия -3, Психология -4.

export const Sociology = skillFabric({ skillSettings });
