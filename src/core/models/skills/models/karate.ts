import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'karate',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//4 опыта - + 1 урона, 8 опыта - +2 урона

export const Karate = skillFabric(skillSettings);
