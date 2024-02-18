import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'eroticArt',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 300,
  cultureBased: false,
  relativeSkills: { acrobatics: -5 },
};

export const EroticArt = skillFabric(skillSettings);
