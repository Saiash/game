import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'acting',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { performance: -2, publicSpeaking: -5 },
};

//+1 за каждую разницу в ИНТ с противником

export const Acting = skillFabric({ skillSettings });
