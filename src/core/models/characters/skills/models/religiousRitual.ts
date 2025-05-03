import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'religiousRitual',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: { ritualMagic: -6, theology: -4 },
};

export const ReligiousRitual = skillFabric({ skillSettings });
