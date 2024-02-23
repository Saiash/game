import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'esotericMedicine',
  parentAttrCode: 'per',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

export const EsotericMedicine = skillFabric({ skillSettings });
