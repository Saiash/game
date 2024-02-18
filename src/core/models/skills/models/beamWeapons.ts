import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'beamWeapons',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const BeamWeapons = skillFabric(skillSettings);
