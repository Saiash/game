import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 4,
  code: 'smallShield',
  melee: {
    relativeSkill: 'saber',
    damageSets: [
      {
        dmgMod: 0,
        reach: [1],
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
    parry: {
      bonus: 0,
      options: 'unavailible',
    },
  },
  cost: 700,
  weight: 2,
  strRequired: 8,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

export const SmallShield = weaponFabric(weaponSettings);

//TODO доделать щиты
