import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'savoirFaire',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 60,
  cultureBased: true,
  relativeSkills: {},
};

// Может заменять бросок реакции
// +2/-2 за разницу в статусе с целью

export const SavoirFaire = skillFabric(skillSettings);
