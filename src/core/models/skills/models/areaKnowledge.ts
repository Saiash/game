import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'areaKnowledge',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: {},
};

export const AreaKnowledge = skillFabric({ skillSettings });
