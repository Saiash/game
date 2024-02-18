import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'packing',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

// Обращение с животными (лошади)-5

export const Packing = skillFabric(skillSettings);
