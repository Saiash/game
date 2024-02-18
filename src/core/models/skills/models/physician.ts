import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'physician',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: { veterinary: -5, firstAid: -11 },
};

export const Physician = skillFabric(skillSettings);
