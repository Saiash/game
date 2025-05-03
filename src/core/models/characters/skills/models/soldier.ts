import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'soldier',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Soldier = skillFabric({ skillSettings });
