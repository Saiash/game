import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'fastDraw',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 0,
  cultureBased: false,
  relativeSkills: {},
};

//Крит - предмет роняется
//Необходима специализация?

export const FastDraw = skillFabric(skillSettings);
