import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'artist',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: {},
};

export const Artist = skillFabric({ skillSettings });
