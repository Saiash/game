import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'brainwashing',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 1800,
  cultureBased: false,
  relativeSkills: {},
};

//только раз в день
// состязание против воли жертвы

export const Brainwashing = skillFabric({ skillSettings });
