import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bodyControl',
  parentAttrCode: 'ht',
  difficulty: 'very hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const BodyControl = skillFabric(skillSettings);
