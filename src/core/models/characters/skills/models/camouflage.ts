import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'camouflage',
  parentAttrCode: 'int',
  difficulty: 'easy',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { survival: -2 },
};

//против зрения или наблюдения
//-1 к умению атакующего

export const Camouflage = skillFabric({ skillSettings });
