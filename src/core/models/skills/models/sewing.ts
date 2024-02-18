import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sewing',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

export const Sewing = skillFabric(skillSettings);
