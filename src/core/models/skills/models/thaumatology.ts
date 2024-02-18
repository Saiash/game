import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'thaumatology',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Thaumatology = skillFabric(skillSettings);
