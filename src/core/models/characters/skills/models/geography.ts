import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'Geography',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// -5 за незнакомый мир

export const Geography = skillFabric({ skillSettings });
