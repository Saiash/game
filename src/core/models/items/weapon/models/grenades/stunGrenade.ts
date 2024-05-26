import { weaponFabric, weaponFabricType } from '../../fabric';

const weaponSettings: weaponFabricType = {
  techLevel: 6,
  code: 'stungGrenade',
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
  cost: 40,
  legalityClass: 2,
  weight: 1,
  img: '',
  zones: [['rightTool'], ['leftTool']],
};

const resolver = () => {
  //TODO: ЗД-5 возд (10 ярдов) оздействует на зрение и слух в радиусе 10 ярдов. Преимущества Защищенный слух и Защи- щенное зрение дают +5 к броску ЗД. При провале вы оглушены; чтобы прийти в себя, делайте каж- дый ход бросок ЗД-5. Также создает дым в области поражения.
};

export const StunGrenade = weaponFabric(weaponSettings, resolver);
