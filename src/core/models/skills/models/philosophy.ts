import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'philosophy',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: {},
};

export const Philosophy = skillFabric(skillSettings);
