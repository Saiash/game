import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'heraldry',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: { savoirFaire: -3 },
};

export const Heraldry = skillFabric({ skillSettings });
