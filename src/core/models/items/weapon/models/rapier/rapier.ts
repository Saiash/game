import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'rapier',
  melee: {
    relativeSkill: 'rapier',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1, 2],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'fencing',
    },
  },
  cost: 500,
  weight: 2.75,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Rapier = weaponFabric(weaponSettings);
