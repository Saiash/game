import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'gesture',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: {},
};

export const Gesture = skillFabric({ skillSettings });
