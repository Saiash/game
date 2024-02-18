import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'shield',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Shield = skillFabric(skillSettings);
