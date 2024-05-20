import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'boardSaber',
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
  cost: 300,
  weight: 2,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const BoardSaber = weaponFabric(weaponSettings);
