import { bodyPartsList } from "../../../models/characters/doll/types";
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
  | 'inventory'
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
  | 'bodyParts'
  | 'innerLayer'
  | 'middleLayer'
  | 'outerLayer'
  | 'doll'
  | 'level'
  | bodyPartsList
  | characterAttrsCodesList
  | secondaryAttrsCodesList
  | perkList
  | disadvantageList
  | skillList;

export const attrsMap = new Map<string, attrsMapType>();

attrsMap.set('Сила', 'str');
attrsMap.set('Урон', 'dmg');
attrsMap.set('Уклонение', 'dodge');
attrsMap.set('Размер', 'size');
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
attrsMap.set('Инвентарь', 'inventory');
attrsMap.set('Части тела', 'bodyParts');
attrsMap.set('Внутренний слой', 'innerLayer');
attrsMap.set('Средний слой', 'middleLayer');
attrsMap.set('Внешний слой', 'outerLayer');
attrsMap.set('Кукла', 'doll');

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
attrsMap.set('Уровень', 'level');

attrsMap.set('Любопытство', 'curiosity');

attrsMap.set('Недостатки', 'disadvantages');

attrsMap.set('Голова', 'head');
attrsMap.set('Череп', 'skull');
attrsMap.set('Лицо', 'face');
attrsMap.set('Глаза', 'eyes');
attrsMap.set('Левый глаз', 'leftEye');
attrsMap.set('Правый глаз', 'rightEye');
attrsMap.set('Уши', 'ears');
attrsMap.set('Левые ухо', 'leftEar');
attrsMap.set('Правые ухо', 'rightEar');
attrsMap.set('Шляпа', 'hat');
attrsMap.set('Рот', 'mouth');
attrsMap.set('Жизненно важные органы', 'vitals');
attrsMap.set('Язык', 'tongue');
attrsMap.set('Нос', 'nose');
attrsMap.set('Шея', 'neck');
attrsMap.set('Корпус', 'torso');
attrsMap.set('Живот', 'belly');
attrsMap.set('Грудь', 'chest');
attrsMap.set('Пояс', 'belt');
attrsMap.set('Пах', 'pelvis');
attrsMap.set('Левая нога', 'leftLeg');
attrsMap.set('Правая нога', 'rightLeg');
attrsMap.set('Левая рука', 'leftArm');
attrsMap.set('Правая рука', 'rightArm');
attrsMap.set('Левая ступня', 'leftFoot');
attrsMap.set('Правая ступня', 'rightFoot');
attrsMap.set('Левая ладонь', 'leftPalm');
attrsMap.set('Правая ладонь', 'rightPalm');
attrsMap.set('Левая голень', 'leftShin');
attrsMap.set('Правая голень', 'rightShin');
attrsMap.set('Левая бедро', 'leftThigh');
attrsMap.set('Правая бедро', 'rightThigh');
attrsMap.set('Спина', 'back');
attrsMap.set('Левое колено', 'leftKnee');
attrsMap.set('Правое колено', 'rightKnee');

attrsMap.set('Левый плечевой сустав', 'leftShoulder');
attrsMap.set('Правое плечевой сустав', 'rightShoulder');

attrsMap.set('Левый плечо', 'leftUpperArm');
attrsMap.set('Правое плечо', 'rightUpperArm');

attrsMap.set('Левое предплечье', 'leftForearm');
attrsMap.set('Правое предплечье', 'rightForearm');
attrsMap.set('Левый локоть', 'leftElbow');
attrsMap.set('Правый локоть', 'rightElbow');
attrsMap.set('Левое запястье', 'leftWrist');
attrsMap.set('Правое запястье', 'rightWrist');

attrsMap.set('Снаряды', 'ammo');
attrsMap.set('Рюкзак', 'backpack');
attrsMap.set('Правый инструмент', 'rightTool');
attrsMap.set('Левый инструмент', 'leftTool');


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
