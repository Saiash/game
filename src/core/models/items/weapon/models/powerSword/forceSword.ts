import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 10,
  code: 'forceSword',
  melee: {
    relativeSkill: 'forceSword',
    damageSets: [
      {
        dmgMod: 32,
        reach: [1, 2],
        damageType: 'burn',
        attackType: 'swing',
        armorDelimiter: 5,
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  cost: 10000,
  weight: 2,
  strRequired: 3,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ForceSword = weaponFabric(weaponSettings);
