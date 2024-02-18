import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'urbanSurvival',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const UrbanSurvival = skillFabric(skillSettings);
