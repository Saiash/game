import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'fortuneTelling',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 3600,
  cultureBased: true,
  relativeSkills: { fastTalk: -3, occultism: -3 },
};

export const FortuneTelling = skillFabric(skillSettings);
