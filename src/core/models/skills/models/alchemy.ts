import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'alchemy',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const Alchemy = skillFabric(skillSettings);
