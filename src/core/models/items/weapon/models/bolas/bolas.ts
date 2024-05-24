import { Character } from '../../../../characters';
import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 0,
  code: 'bolas',
  throw: {
    relativeSkill: 'bolas',
    bulk: 2,
    aim: 0,
    range: { maxRange: 4, strBased: true },
    damageSets: [
      {
        dmgMod: -1,
        damageType: 'cr',
        attackType: 'thrust',
      },
    ],
  },
  cost: 20,
  weight: 2,
  strRequired: 7,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = (targer: Character) => {
  //TODO: может опутать?
};

export const Bolas = weaponFabric(weaponSettings, resolver);
