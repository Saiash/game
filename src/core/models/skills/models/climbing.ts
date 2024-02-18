import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'climbing',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Climbing = skillFabric(skillSettings);
