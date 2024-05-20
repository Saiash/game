import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'brassKnuckles',
  melee: {
    relativeSkill: 'brawling',
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
    },
  },
  techLevel: 1,
  cost: 10,
  weight: 0.25,
  strRequired: 0,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BrassKnuckles = weaponFabric(weaponSettings);
