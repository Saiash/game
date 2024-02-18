import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'crossbow',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Crossbow = skillFabric(skillSettings);
