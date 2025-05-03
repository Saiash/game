import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'scrounging',
  parentAttrCode: 'per',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const Scrounging = skillFabric({ skillSettings });
