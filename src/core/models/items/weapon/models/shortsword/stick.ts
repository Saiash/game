import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'stick',
  melee: {
    relativeSkill: 'shortsword',
    damageSets: [
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'cr',
        attackType: 'swing',
      },
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'fencing',
    },
  },
  cost: 20,
  weight: 1,
  strRequired: 6,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Stick = weaponFabric(weaponSettings);
