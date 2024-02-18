import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'law',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: {},
};

export const Law = skillFabric(skillSettings);
