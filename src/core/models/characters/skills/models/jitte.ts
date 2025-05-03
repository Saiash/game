import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'jitte',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { forceSword: -4, mainGauche: -4, shortsword: -3 },
};

// +2 к обезоруживанию

export const Jitte = skillFabric({ skillSettings });
