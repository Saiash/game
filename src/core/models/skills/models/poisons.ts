import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'poisons',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { chemistry: -5, physician: -3, pharmacy: -3 },
};

// Химия-5 или Врачебное дело-3, Фармацев- тика-3.

export const Poisons = skillFabric(skillSettings);
