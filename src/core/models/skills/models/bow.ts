import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bow',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Bow = skillFabric(skillSettings);
