import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'stageCombat',
  parentAttrCode: 'dex',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: { performance: -3 },
};

export const StageCombat = skillFabric(skillSettings);
