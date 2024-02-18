import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'jumping',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//Кроме того, вы можете использовать половину значения умения Прыжков вместо Базового движения для расчета дальности прыжка

export const Jumping = skillFabric(skillSettings);
