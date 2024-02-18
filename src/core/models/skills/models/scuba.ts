import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'scuba',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { environmentSuit: -2 },
};

// бросок каждые 30 минут

export const Scuba = skillFabric(skillSettings);
