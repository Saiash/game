import { Character } from '../../../../characters';
import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 8,
  code: 'dartGun',
  ranged: {
    relativeSkill: 'rifle',
    aim: 6,
    range: { halfRange: 45, maxRange: 145, strBased: false },
    rateOfFire: { rof: 1, shots: 1, type: 'semiauto' },
    bulk: -5,
    recoil: 2,
    reloadTime: 3,
    ammoClip: { maxAmmo: 1, type: 'niddle' },
    damageSets: [
      {
        dmgMod: 4,
        armorDelimiter: 0.2,
        damageType: 'pi-',
        attackType: 'thrust',
      },
    ],
  },
  twoHanded: true,
  legalityClass: 4,
  cost: 1200,
  weight: 6.6,
  strRequired: 9,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = (targer: Character) => {
  //TODO: яд от дротика?
};

export const DartGun = weaponFabric(weaponSettings, resolver);
