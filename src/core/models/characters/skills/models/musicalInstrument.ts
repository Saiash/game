import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'musicalInstrument',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: {},
};

export const MusicalInstrument = skillFabric({ skillSettings });
