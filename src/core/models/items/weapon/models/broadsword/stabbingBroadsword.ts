import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  code: 'stabbingBroadsword',
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
        dmgMod: 2,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  techLevel: 2,
  cost: 600,
  weight: 3,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const StabbingBroadsword = weaponFabric(weaponSettings);
