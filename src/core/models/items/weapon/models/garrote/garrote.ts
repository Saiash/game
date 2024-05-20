import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'garrote',
  melee: {
    relativeSkill: 'garrote',
    damageSets: [
      {
        dmgMod: 0,
        reach: [0],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  cost: 2,
  weight: 0,
  strRequired: 3,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Garrote = weaponFabric(weaponSettings);

//TODO: page 405
