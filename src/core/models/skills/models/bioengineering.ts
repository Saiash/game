import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bioengineering',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 7200,
  cultureBased: false,
  relativeSkills: { biology: -5 },
};

export const Bioengineering = skillFabric(skillSettings);
