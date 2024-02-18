import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'veterinary',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { physician: -5, surgery: -5, animalHandling: -5 },
};

export const Veterinary = skillFabric(skillSettings);
