import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'acrobatics',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//Удачный бросок снижает высоту падения на 5 метров
//Можно использовать при уклонении, что бы получить +Х

export const Acrobatics = skillFabric({ skillSettings });
