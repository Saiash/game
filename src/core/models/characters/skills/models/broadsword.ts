import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'broadsword',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    rapier: -4,
    saber: -4,
    shortsword: -2,
    twoHandedSword: -4,
    forceSword: -4,
  },
};

export const Broadsword = skillFabric({ skillSettings });
