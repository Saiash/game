import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'jeweler',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { smith: -4 },
};

//Куз- нец (Медь или Олово и свинец)-4.

export const Jeweler = skillFabric(skillSettings);
