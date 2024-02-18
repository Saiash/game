import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'performance',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1800,
  cultureBased: true,
  relativeSkills: { acting: -2, publicSpeaking: -2 },
};

export const Performance = skillFabric(skillSettings);
