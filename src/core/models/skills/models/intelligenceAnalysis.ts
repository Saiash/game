import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'intelligenceAnalysis',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { strategy: -6 },
};

export const IntelligenceAnalysis = skillFabric(skillSettings);
