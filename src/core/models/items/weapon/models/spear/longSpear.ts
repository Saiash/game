import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'longSpear',
  melee: {
    relativeSkill: 'spear',
    damageSets: [
      {
        dmgMod: 3,
        reach: [2, 3],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  cost: 60,
  weight: 5,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LongSpear = weaponFabric(weaponSettings);
