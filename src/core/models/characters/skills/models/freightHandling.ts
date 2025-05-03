import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'freightHandling',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const FreightHandling = skillFabric({ skillSettings });
