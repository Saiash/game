import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'battleStaff',
  melee: {
    relativeSkill: 'staff',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1, 2],
        damageType: 'cr',
        attackType: 'swing',
      },
      {
        dmgMod: 2,
        reach: [1, 2],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 2,
    },
  },
  twoHanded: true,
  cost: 10,
  weight: 4,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BattleStaff = weaponFabric(weaponSettings);
