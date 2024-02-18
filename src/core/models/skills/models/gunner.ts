import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'gunner',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Gunner = skillFabric(skillSettings);
