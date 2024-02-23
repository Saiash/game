import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'diagnosis',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

// Первая Помощь-8, Ветеринария-5 или Врачебное дело-4.

export const Diagnosis = skillFabric({ skillSettings });
