import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'lightWalk',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const LightWalk = skillFabric({ skillSettings });
