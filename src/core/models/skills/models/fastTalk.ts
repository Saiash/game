import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'fastTalk',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: { artist: -5 },
};

// можно использовать вместо реакции

export const FastTalk = skillFabric(skillSettings);
