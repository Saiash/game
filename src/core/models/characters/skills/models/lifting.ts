import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'lifting',
  parentAttrCode: 'ht',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//больше чем БГ поднимать, +5% за поинт

export const Lifting = skillFabric({ skillSettings });
