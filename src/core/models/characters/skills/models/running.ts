import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'running',
  parentAttrCode: 'ht',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const Running = skillFabric({ skillSettings });
