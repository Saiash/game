import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'speedReading',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

// персонаж, обладающий этим умением, увели- чивает скорость чтения в 1+(уме- ние/10) раз.

export const SpeedReading = skillFabric(skillSettings);
