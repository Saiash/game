import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'lipReading',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const LipReading = skillFabric(skillSettings);
