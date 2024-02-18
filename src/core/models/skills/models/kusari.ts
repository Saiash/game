import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'kusari',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {
    monowireWhip: -3,
    whip: -3,
    forceWhip: -3,
    twoHandedFlail: -4,
  },
};

export const Kusari = skillFabric(skillSettings);
