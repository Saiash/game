import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'ritualMagic',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: { religiousRitual: -6 },
};

export const RitualMagic = skillFabric(skillSettings);
