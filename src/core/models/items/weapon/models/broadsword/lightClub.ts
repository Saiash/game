import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'lightClub',
  melee: {
    relativeSkill: 'broadsword',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'cr',
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
  techLevel: 0,
  cost: 5,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const LightClub = weaponFabric(weaponSettings);
