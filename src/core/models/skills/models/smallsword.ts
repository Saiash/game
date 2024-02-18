import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'smallsword',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { shortsword: -4 },
};

export const Smallsword = skillFabric(skillSettings);
