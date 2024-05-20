import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 2,
  code: 'shortSword',
  melee: {
    relativeSkill: 'shortsword',
    damageSets: [
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  cost: 400,
  weight: 2,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const ShortSword = weaponFabric(weaponSettings);
