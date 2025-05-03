import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'publicSpeaking',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: true,
  relativeSkills: { acting: -5, performance: -2, politics: -5 },
};

// Выступ- ление-2, Артистизм-5, Политика-5.

export const PublicSpeaking = skillFabric({ skillSettings });
