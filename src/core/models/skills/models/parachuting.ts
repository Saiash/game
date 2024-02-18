import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'parachuting',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Parachuting = skillFabric(skillSettings);
