import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'flail',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//Топор/Булава -4.

export const Flail = skillFabric({ skillSettings });
