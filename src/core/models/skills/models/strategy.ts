import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'strategy',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 3600,
  cultureBased: false,
  relativeSkills: {},
};

// Успешный бросок Стратегии поз- волит вам выяснить наперед военные планы противника, если только им не командует другой человек, обла- дающий данным умением. В таком случае Мастер проводит Состязание умений между двумя стратегами; если игровой персонаж проигрывает, то его предположение о планах врага ошибочно

export const Strategy = skillFabric(skillSettings);
