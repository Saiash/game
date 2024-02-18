import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'hiking',
  parentAttrCode: 'ht',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

//от потери усталости?

export const Hiking = skillFabric(skillSettings);
