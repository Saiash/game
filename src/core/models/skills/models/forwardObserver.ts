import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'forwardObserver',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { artillery: -5 },
};

export const ForwardObserver = skillFabric(skillSettings);
