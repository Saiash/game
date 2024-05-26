import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'chemicalGrenade',
  explosion: {
    relativeSkill: 'throwing',
    fuseTime: 2,
    damageSets: [
      {
        dmgMod: 0,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },
  cost: 10,
  legalityClass: 3,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = () => {
  //TODO: создает газ до конца боя, яд ка котдельная модификация?
};

export const ChemicalGrenade = weaponFabric(weaponSettings, resolver);
