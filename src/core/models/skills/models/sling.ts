import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sling',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Sling = skillFabric(skillSettings);
