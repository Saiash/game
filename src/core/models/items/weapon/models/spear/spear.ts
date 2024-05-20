import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'spear',
  melee: {
    relativeSkill: 'spear',
    damageSets: [
      {
        dmgMod: 3,
        reach: [1, 2],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  twoHanded: true,
  cost: 40,
  weight: 4,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Spear = weaponFabric(weaponSettings);
