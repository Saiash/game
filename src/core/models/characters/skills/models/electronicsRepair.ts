import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'electronicsRepair',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1800,
  cultureBased: false,
  relativeSkills: { electronicOperations: -3, engineer: -3 },
};

// Если нет схем - 2, за незнакомую технологию -2

export const ElectronicsRepair = skillFabric({ skillSettings });
