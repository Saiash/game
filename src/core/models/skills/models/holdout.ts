import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'holdout',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 60,
  cultureBased: false,
  relativeSkills: {},
};

// Штрафы и бонусы в зависимости от размера. -4 за что-то маленькое, 0 компактдиск, -4 меч, -6 арбалет. от -5 до +5 за объем одежды
// ьбыстрое состязание поиск против утаивания

export const Holdout = skillFabric({ skillSettings });
