import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'armoury',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1800,
  cultureBased: false,
  relativeSkills: { engineer: -4 },
};

export const Armoury = skillFabric({ skillSettings });
