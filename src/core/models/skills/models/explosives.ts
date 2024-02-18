import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'explosives',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { engineer: -3, chemistry: -3 },
};

export const Explosives = skillFabric(skillSettings);
