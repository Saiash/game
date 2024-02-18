import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'mount',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const Mount = skillFabric(skillSettings);
