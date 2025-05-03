import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'crypthography',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { mathematics: -5 },
};

// только раз в день
// соревновение против шифра

export const Crypthography = skillFabric({ skillSettings });
