import { raceFabricType, raceFabric } from '.';

export const raceSettings: raceFabricType = {
  code: 'dwarf',
  attributes: {
    ht: 1,
    will: 1,
  },
  secondaryAttributes: {
    size: -1,
  },
  perk: {},
};

export const Dwarf = raceFabric({
  raceSettings,
});

/*

Преимущества: Мастер 1 [10]; Обна-
ружение золота (Нечеткий, -50%) [3];Увеличенныйсрокжизни1[2]; Адаптация к темноте 5 [5].

*/
