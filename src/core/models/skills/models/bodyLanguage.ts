import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'bodyLanguage',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: {},
};

//модификаторы темноты
//маски и плащи (как и объемная одежда) могут блокировать уменеие

export const BodyLanguage = skillFabric(skillSettings);
