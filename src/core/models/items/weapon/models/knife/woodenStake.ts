import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'woodenStake',
  melee: {
    relativeSkill: 'knife',
    damageSets: [
      {
        dmgMod: 0,
        reach: [0],
        armorDelimiter: 0.5,
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: -1,
    },
  },
  cost: 4,
  weight: 0.5,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const WoodenStake = weaponFabric(weaponSettings);
