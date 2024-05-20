import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 3,
  code: 'katana',
  melee: {
    relativeSkill: 'broadsword',
    damageSets: [
      {
        dmgMod: 2,
        reach: [1, 2],
        damageType: 'cut',
        attackType: 'swing',
      },
      {
        dmgMod: 1,
        reach: [1],
        damageType: 'imp',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
    },
  },
  cost: 650,
  weight: 5,
  strRequired: 10,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const Katana = weaponFabric(weaponSettings);
