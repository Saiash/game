import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'brawling',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//при 8 вложенных опыта - +1 к урону

export const Brawling = skillFabric(skillSettings);
