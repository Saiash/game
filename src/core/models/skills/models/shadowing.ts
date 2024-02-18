import { skillFabric, skillFabricType } from './index';

const skillSettings: skillFabricType = {
  code: 'shadowing',
  parentAttrCode: 'int',
  difficulty: 'medium',
  defaultSkillTime: 600,
  cultureBased: false,
  relativeSkills: {},
};

// Наблюде- ние-5 или Скрытность-4 (только пешком).
//Проводите Состязание каждый 10 минут: ваша Слежка против Зрения объекта; если вы проигрываете, то теряете субъек- та, а если величина провала была 5+, то он вас заметил.

export const Shadowing = skillFabric(skillSettings);
