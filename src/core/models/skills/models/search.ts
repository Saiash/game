import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'search',
  parentAttrCode: 'per',
  difficulty: 'medium',
  defaultSkillTime: 120,
  cultureBased: false,
  relativeSkills: { criminology: -5 },
};

//TODO:  Для умышленно скрытых предметов проводится быстрое состя зание по умению Обыска против  Утаивания или Контрабанды.
//TODO:  до +5 за личный досмотр (ощупывание; проверка всего тела; проверка всех полостей)

export const Search = skillFabric({ skillSettings });
