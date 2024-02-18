import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'forcedEntry',
  parentAttrCode: 'dex',
  difficulty: 'easy',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

export const ForcedEntry = skillFabric(skillSettings);
