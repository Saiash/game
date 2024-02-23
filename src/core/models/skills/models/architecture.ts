import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'architecture',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { engineer: -4 },
};

export const Architecture = skillFabric({ skillSettings });
