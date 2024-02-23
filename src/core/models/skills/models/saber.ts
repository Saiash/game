import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'saber',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { broadsword: -4, shortsword: -4 },
};

export const Saber = skillFabric({ skillSettings });
