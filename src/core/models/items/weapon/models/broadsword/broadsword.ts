import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'broadsword',
  melee: {
    relativeSkill: 'broadsword',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  techLevel: 2,
  cost: 500,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Broadsword = weaponFabric(weaponSettings);
