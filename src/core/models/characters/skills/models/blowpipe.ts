import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'blowpipe',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Blowpipe = skillFabric({ skillSettings });
