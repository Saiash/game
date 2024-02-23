import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'net',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { cloak: -5 },
};

export const Net = skillFabric({ skillSettings });
