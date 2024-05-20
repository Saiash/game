import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'smallSword',
  melee: {
    relativeSkill: 'shortsword',
    damageSets: [
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'fencing',
    },
  },
  cost: 400,
  weight: 1.5,
  strRequired: 5,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SmallSword = weaponFabric(weaponSettings);
