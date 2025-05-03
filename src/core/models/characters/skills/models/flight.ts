import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'flight',
  parentAttrCode: 'ht',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//теряет усталость при провале?

export const Flight = skillFabric({ skillSettings });
