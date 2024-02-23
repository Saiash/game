import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'skating',
  parentAttrCode: 'ht',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// провал - падение
// крит падение - 1к урона

export const Skating = skillFabric({ skillSettings });
