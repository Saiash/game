import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'computerOperations',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: {},
};

export const ComputerOperations = skillFabric({ skillSettings });
