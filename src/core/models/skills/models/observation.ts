import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'observation',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { shadowing: -5 },
};

//штрафы за темноту и расстонияе

export const Observation = skillFabric({ skillSettings });
