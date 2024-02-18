import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'masonry',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const Masonry = skillFabric(skillSettings);
