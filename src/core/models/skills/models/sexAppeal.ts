import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'sexAppeal',
  parentAttrCode: 'ht',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

//TODO: При необходимости броска вли- яния (с.359) со стороны представи- теля противоположного пола (или того, кого привлекают лица ваше- го пола) вы можете заменить его броском Сексапильности.

export const SexAppeal = skillFabric({ skillSettings });
