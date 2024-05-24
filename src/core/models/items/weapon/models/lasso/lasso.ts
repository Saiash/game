import { Character } from '../../../../characters';
import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'lasso',
  throw: {
    relativeSkill: 'lasso',
    bulk: 2,
    aim: 0,
    range: { maxRange: 1, strBased: true },
    damageSets: [
      {
        dmgMod: -8,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  cost: 40,
  weight: 3,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = (targer: Character) => {
  //TODO: может опутать?
};

export const Lasso = weaponFabric(weaponSettings, resolver);
