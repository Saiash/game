import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'swimming',
  parentAttrCode: 'ht',
  difficulty: 'easy',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//для предотвращения потери усталости

export const Swimming = skillFabric(skillSettings);
