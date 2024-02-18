import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'spear',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// Алебарда-4, посох-2.

export const Spear = skillFabric(skillSettings);
