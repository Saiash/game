import { damageRoll } from '../../characters/attributes/models/damage';

export type damageType =
  | 'aff'
  | 'burn'
  | 'cor'
  | 'cr'
  | 'cut'
  | 'fat'
  | 'imp'
  | 'pi-'
  | 'pi'
  | 'pi+'
  | 'pi++'
  | 'spec'
  | 'tox';

export const damageMods: Record<damageType, number> = {
  'pi-': 0.5,
  pi: 1,
  aff: 1,
  burn: 1,
  cor: 1,
  cr: 1,
  cut: 1.5,
  fat: 1,
  imp: 2,
  'pi+': 1.5,
  'pi++': 2,
  spec: 1,
  tox: 1,
};

export function calculateThrustVal(
  charStr: number,
  maxStr: number,
  mods: number
): damageRoll {
  const str = charStr > maxStr ? maxStr : charStr;
  const strMod = Math.floor((str - 1) / 2) + mods;
  const dices = strMod <= 5 ? 1 : Math.floor((strMod - 5) / 4) + 1;
  const mod = strMod <= 6 ? strMod - 6 : ((strMod - 5) % 4) - 1;
  return { dices, mod, raw: strMod };
}

export function calculateSwingVal(
  charStr: number,
  maxStr: number,
  mods: number
): damageRoll {
  const str = charStr > maxStr ? maxStr : charStr;
  const dices = Math.floor(str / 4) - 1 + mods;
  const mod = str % 4 === 0 ? 2 : (str % 4) - 2;
  return { dices, mod, raw: str };
}

/* Схема
  character1.attack(Character2, options)
  options: {
    чем;
    куда;
    тип атакаи;
    ...
  } ->
  кинуть кубик;
    если промах то пофиг
    если попадание ->
  кинуть кубик на урон -> отдать расчет повреждений цели
  */

//Делитель брони: число в скоб- ках после повреждений - напри- мер, (2) - это делитель брони. Раз- делите на него общий СП цели перед тем, как вычесть его из на- несенных вами повреждений (или добавить его к броску ЗД цели в случае сопротивления воздейс- твию). Например, атака с делите- лем (2) уменьшит СП вполовину. Дробный делитель увеличит бро- ню: (0,5) увеличит СП на два; (0,2) умножит ее в пять раз; а (0,1) - в десять.

//Иногда при сложении модификаторов будет получаться боль- шое число, например, 2к+5. В этом случае Мастер может заменить любые +4 на 1к и +7 на 2к. Например, повреждения 2к+5 будут равны 3к+1. Если модификатор дается «на кубик повреждений», примените его к каждому кубику базовых прямых или амплитуд- ных повреждений перед заменой модификаторов кубиками.
//Это дает более реалистичные результаты, но требует дополни- тельных усилий при заполнении листа персонажа и т.д.
