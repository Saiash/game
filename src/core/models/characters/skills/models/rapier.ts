import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'rapier',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { broadsword: -4, shortsword: -4 },
};

export const Rapier = skillFabric({ skillSettings });
