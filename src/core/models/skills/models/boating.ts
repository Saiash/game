import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'boating',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//до -3 за шторм и прочая

export const Boating = skillFabric(skillSettings);
