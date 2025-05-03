import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'intimidation',
  parentAttrCode: 'will',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: { acting: -3 },
};

export const Intimidation = skillFabric({ skillSettings });
