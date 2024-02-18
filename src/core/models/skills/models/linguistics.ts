import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'linguistics',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const Linguistics = skillFabric(skillSettings);
