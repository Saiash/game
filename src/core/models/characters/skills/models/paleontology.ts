import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'paleontology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: {},
};

// Биология-4.

export const Paleontology = skillFabric({ skillSettings });
