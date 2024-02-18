import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bicycling',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//Вы полу- чаете +4, если все, что вы хотите – это проехать и не упасть.

export const Bicycling = skillFabric(skillSettings);
