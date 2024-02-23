import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'economics',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { marketAnalysis: -5, finance: -3, merchant: -6 },
};

export const Economics = skillFabric({ skillSettings });
