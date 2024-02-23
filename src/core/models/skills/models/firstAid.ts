import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'firstAid',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { esotericMedicine: -4, veterinary: -4, physician: -4 },
};

export const FirstAid = skillFabric({ skillSettings });
