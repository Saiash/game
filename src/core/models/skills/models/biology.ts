import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'biology',
  parentAttrCode: 'int',
  difficulty: 'very hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: { naturalist: -6 },
};
//Нату- ралист-6.
//Обычно с -4?

export const Biology = skillFabric(skillSettings);
