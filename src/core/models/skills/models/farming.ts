import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'farming',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { biology: -5, gardening: -3 },
};

export const Farming = skillFabric(skillSettings);
