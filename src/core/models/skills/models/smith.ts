import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'smith',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

//Ювелир-4.

export const Smith = skillFabric(skillSettings);
