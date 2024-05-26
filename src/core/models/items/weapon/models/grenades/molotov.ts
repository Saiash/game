import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'molotov',
  explosion: {
    relativeSkill: 'throwing',
    fuseTime: 0,
    damageSets: [
      {
        dmgMod: 0,
        damageType: 'cr',
        attackType: 'swing',
      },
    ],
  },
  cost: 2,
  legalityClass: 3,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = () => {
  //TODO: поджигает землю и/или цель?
};

export const Molotov = weaponFabric(weaponSettings, resolver);

//TODO: Попытки парировать цепы получают -4, а фехтовальным оружием (парирование «Ф») это вообще невозможно! Попытки блокировать цепы проходят с -2. Нунчаки меньше, поэтому дают только половину этих штрафов.
