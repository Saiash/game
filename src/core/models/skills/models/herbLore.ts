import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'herbLore',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const HerbLore = skillFabric(skillSettings);
