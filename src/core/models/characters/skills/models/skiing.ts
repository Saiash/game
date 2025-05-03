import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'skiing',
  parentAttrCode: 'ht',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//TODO:  крит падение - 1к урона

export const Skiing = skillFabric({ skillSettings });
