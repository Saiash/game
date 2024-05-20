import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 1,
  code: 'dagger',
  melee: {
    relativeSkill: 'knife',
    damageSets: [
      {
        dmgMod: -1,
        reach: [0],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: -1,
    },
  },
  cost: 20,
  weight: 0.25,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Dagger = weaponFabric(weaponSettings);
