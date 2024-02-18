import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'forgery',
  parentAttrCode: 'int',
  difficulty: 'hard',
  defaultSkillTime: 24400,
  cultureBased: false,
  relativeSkills: { counterfeiting: -2 },
};

//  Проверка документа срабатывает каждый раз; документ создается с фиксированной сложностью подделки

export const Forgery = skillFabric(skillSettings);
