import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'finance',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: { accounting: -3, economics: -3, merchant: -6 },
};

export const Finance = skillFabric({ skillSettings });
