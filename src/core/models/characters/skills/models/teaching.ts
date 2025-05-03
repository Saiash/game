import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'teaching',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: {},
};

export const Teaching = skillFabric({ skillSettings });
