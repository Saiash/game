import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'innateAttack',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const InnateAttack = skillFabric({ skillSettings });
