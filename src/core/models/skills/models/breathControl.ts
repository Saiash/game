import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'breathControl',
  parentAttrCode: 'ht',
  difficulty: 'hard',
  defaultSkillTime: 120,
  cultureBased: false,
  relativeSkills: {},
};

//восстанавливает 1 ЕУ за 2 минуты
//раз в 5 раундов

export const BreathControl = skillFabric(skillSettings);
