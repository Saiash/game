import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'hiddenLore',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const HiddenLore = skillFabric(skillSettings);
