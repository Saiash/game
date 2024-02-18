import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'electronicsOperation',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { electronicsRepair: -5, engineer: -5 },
};

export const ElectronicOperations = skillFabric(skillSettings);
