import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'physiology',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { diagnosis: -5, surgery: -5, physician: -5 },
};

export const Physiology = skillFabric({ skillSettings });
