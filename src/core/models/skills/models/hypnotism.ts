import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'hypnotism',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: {},
};

//раз в день

export const Hypnotism = skillFabric(skillSettings);
