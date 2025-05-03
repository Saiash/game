import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'polearm',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

// посох-4, копье-4, дву- ручный топор/булава-4.

export const Polearm = skillFabric({ skillSettings });
