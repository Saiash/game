import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'dreaming',
  parentAttrCode: 'will',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const Dreaming = skillFabric(skillSettings);
