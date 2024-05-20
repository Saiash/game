import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'bastardSword',
  melee: {
    relativeSkill: 'broadsword',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1, 2],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 1,
        reach: [2],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unbalanced',
    },
  },
  techLevel: 3,
  cost: 650,
  weight: 5,
  strRequired: 11,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BastardSword = weaponFabric(weaponSettings);
