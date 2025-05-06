import { disadvantageList, perkList } from "../../../models/characters/perk/type";
import { skillList } from "../../../models/characters/skills/models";

export type characterAttrsCodesList =
  | 'str'
  | 'dex'
  | 'ht'
  | 'int'
  | 'hp'
  | 'per'
  | 'will'
  | 'speed'
  | 'move'
  | 'ft'
  | 'weight';

export type secondaryAttrsCodesList =
  | 'weight'
  | 'dmg'
  | 'dodge'
  | 'size'
  | 'reaction';

export type attrsMapType =
  | 'object'
  | 'property'
  | 'modificator'
  | 'id'
  | 'character'
  | 'name'
  | 'gender'
  | 'location'
  | 'socialStatus'
  | 'attribute'
  | 'secondaryAttributes'
  | 'baseParameters'
  | 'value'
  | 'currentValue'
  | 'skills'
  | 'difficulty'
  | 'time'
  | 'cultureBased'
  | 'relatedSkills'
  | 'cultures'
  | 'socialGroups'
  | 'perks'
  | 'disadvantages'
  | characterAttrsCodesList
  | secondaryAttrsCodesList
  | perkList
  | disadvantageList
  | skillList;

export const attrsMap = new Map<string, attrsMapType>();

attrsMap.set('Сила', 'str');
attrsMap.set('Ловкость', 'dex');
attrsMap.set('Здоровье', 'ht');
attrsMap.set('Интеллект', 'int');
attrsMap.set('Жизни', 'hp');
attrsMap.set('Восприятие', 'per');
attrsMap.set('Воля', 'will');
attrsMap.set('Скорость', 'speed');
attrsMap.set('Движение', 'move');
attrsMap.set('Усталость', 'ft');
attrsMap.set('Нагрузка', 'weight');
attrsMap.set('Сложность', 'difficulty');
attrsMap.set('Время', 'time');
attrsMap.set('Зависит от культуры', 'cultureBased');
attrsMap.set('Связанные навыки', 'relatedSkills');
attrsMap.set('Культуры', 'cultures');
attrsMap.set('Социальные группы', 'socialGroups');

attrsMap.set('Объект', 'object');
attrsMap.set('Свойство', 'property');
attrsMap.set('Модификатор', 'modificator');
attrsMap.set('ID', 'id');
attrsMap.set('Параметры', 'baseParameters');
attrsMap.set('Персонаж', 'character');
attrsMap.set('Пол', 'gender');
attrsMap.set('Имя', 'name');
attrsMap.set('Статус', 'socialStatus');
attrsMap.set('Атрибуты', 'attribute');
attrsMap.set('Вторичные атрибуты', 'secondaryAttributes');
attrsMap.set('Локация', 'location');
attrsMap.set('Значение', 'value');
attrsMap.set('Текущее Значение', 'currentValue');
attrsMap.set('Навыки', 'skills');
attrsMap.set('Преимущества', 'perks');
attrsMap.set('Недостатки', 'disadvantages');

attrsMap.set('Бухгалтерский учет', 'accounting');
attrsMap.set('Торговля', 'merchant');
attrsMap.set('Математика', 'mathematics');
attrsMap.set('Финансы', 'finance');
attrsMap.set('Анализ рынка', 'marketAnalysis');
attrsMap.set('Экономика', 'economics');

// ----------------------------------------------------------------------

export type dataValue = Set<string>;
export type dataAttribute = Map<attrsMapType, dataValue | dataAttribute>;
export type DataStructure = Map<attrsMapType, dataAttribute>;
export const reverseMap = new Map<attrsMapType, string>();
attrsMap.forEach((key, value) => {
  reverseMap.set(key, value);
});
