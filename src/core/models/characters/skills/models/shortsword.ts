import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'shortsword',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    forceSword: -4,
    broadsword: -2,
    knife: -4,
    jitte: -3,
    tonfa: -3,
    saber: -3,
  },
};

export const Shortsword = skillFabric({ skillSettings });
