import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'housekeeping',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Housekeeping = skillFabric({ skillSettings });
