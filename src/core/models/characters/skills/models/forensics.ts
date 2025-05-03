import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'forensics',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: { criminology: -4 },
};

export const Forensics = skillFabric({ skillSettings });
