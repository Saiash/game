import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'chemistry',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { alchemy: -3 },
};

export const Chemistry = skillFabric(skillSettings);
