import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'fishing',
  parentAttrCode: 'per',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const Fishing = skillFabric(skillSettings);
