import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'survival',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 1800,
  cultureBased: false,
  relativeSkills: { naturalist: -3 },
};

// TODO: до -5 при плохих погодных условиях;
// TODO: Один человек с этим умением может прокормить до деся- ти спутников. Каждый день нужно делать бросок умения, чтобы безо- пасно (или даже с удобствами) жить в дикой местности.
// TODO: Провальный бросок означает, что каждый член группы получает 2к-4 повреждений (отдельный бросок для каждого)..',

export const Survival = skillFabric({ skillSettings });
