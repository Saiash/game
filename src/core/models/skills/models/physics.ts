import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'physics',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Physics = skillFabric(skillSettings);
