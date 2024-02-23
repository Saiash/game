import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'judo',
  parentAttrCode: 'dex',
  difficulty: 'hard',
  defaultSkillTime: 1,
  cultureBased: false,
  relativeSkills: {},
};

//нет штрафа за парирование руками
//можно ронять противника на соседней клетке после парирования
//Если кинуть в кого-то - тот кидает СЛ/ЛОВ + 3

export const Judo = skillFabric({ skillSettings });
