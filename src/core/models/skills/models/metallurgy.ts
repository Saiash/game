import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'metallurgy',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { smith: -8, jeweler: -8, chemistry: -5 },
};

export const Metallurgy = skillFabric(skillSettings);
