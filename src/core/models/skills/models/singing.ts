import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'singing',
  parentAttrCode: 'ht',
  difficulty: 'easy',
  defaultSkillTime: 300,
  cultureBased: true,
  relativeSkills: {},
};

export const Singing = skillFabric({ skillSettings });
