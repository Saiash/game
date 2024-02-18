import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'computerProgramming',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: {},
};

export const ComputerProgramming = skillFabric(skillSettings);
