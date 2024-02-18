import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'hazardousMaterials',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

export const HazardousMaterials = skillFabric(skillSettings);
