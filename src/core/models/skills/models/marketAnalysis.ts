import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'marketAnalysis',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { economics: -5, merchant: -4 },
};

export const MarketAnalysis = skillFabric(skillSettings);
