import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'meteorology',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Meteorology = skillFabric(skillSettings);
