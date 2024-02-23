import { raceFabricType, raceFabric } from '.';

export const raceSettings: raceFabricType = {
  code: 'felinoid',
  attributes: {
    str: -1,
    dex: 1,
  },
  secondaryAttributes: {},
  perk: {},
};

export const Felinoid = raceFabric({
  raceSettings,
});

/*

Преимущества: Обостренный слух 2 [4]; Обостренный вкус и обоняние 1 [2]; Мягкое падение [10]; Когти (Острые) [5]; Боевые рефлексы [15]; Сопротивление повреждениям 1 [5]; Зубы (Острые) [1]; Устойчивость к температуре 1 [1].
Недостатки: Импульсивность (12) [-10]; Сонливый (1/2 всего време- ни) [-8].
Особенности: Мурлыкающий голос; Хвост.

*/
