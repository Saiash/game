import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'detectLies',
  parentAttrCode: 'per',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: true,
  relativeSkills: { bodyLanguage: -4, psychology: -4 },
};

// Когда вы заявляете об использовании данного умения, то Мастер проводит Быстрое состязание умений между вашим Определением лжи и ИН оппонента  (либо его Загова- риванием зубов, либо Артистизмом)

export const DetectLies = skillFabric(skillSettings);
