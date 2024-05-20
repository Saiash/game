import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'stabbingBastardSword',
  melee: {
    relativeSkill: 'broadsword',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1, 2],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 2,
        reach: [2],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  techLevel: 3,
  cost: 750,
  weight: 5,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const StabbingBastardSword = weaponFabric(weaponSettings);
