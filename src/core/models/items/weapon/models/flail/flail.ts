import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'flail',
  melee: {
    relativeSkill: 'flail',
    damageSets: [
      {
        dmgMod: 3,
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
  cost: 80,
  weight: 6,
  strRequired: 12,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Flail = weaponFabric(weaponSettings);

//TODO: Попытки парировать цепы получают -4, а фехтовальным оружием (парирование «Ф») это вообще невозможно! Попытки блокировать цепы проходят с -2. Нунчаки меньше, поэтому дают только половину этих штрафов.
