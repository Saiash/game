import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'cartography',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { geography: -2, navigation: -4, mathematics: -2 },
};

export const Cartography = skillFabric(skillSettings);
