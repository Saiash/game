import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'nunchakus',
  melee: {
    relativeSkill: 'flail',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'cr',
        attackType: 'swing',
        options: { parry: -4, block: -2 },
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  cost: 20,
  weight: 2,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Nunchakus = weaponFabric(weaponSettings);

//TODO: Попытки парировать цепы получают -4, а фехтовальным оружием (парирование «Ф») это вообще невозможно! Попытки блокировать цепы проходят с -2. Нунчаки меньше, поэтому дают только половину этих штрафов.
