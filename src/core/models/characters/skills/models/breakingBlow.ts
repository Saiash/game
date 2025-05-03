import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'breakingBlow',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 0,
  cultureBased: false,
  relativeSkills: {},
};

//Проверка после попадания, если успех - делитель брони 5
//раз в 5 раундов

export const BreakingBlow = skillFabric({ skillSettings });
