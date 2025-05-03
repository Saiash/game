import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'leatherworking',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Leatherworking = skillFabric({ skillSettings });
