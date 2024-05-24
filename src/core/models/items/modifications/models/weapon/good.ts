import { Item } from '../../../item';
import { Weapon } from '../../../weapon';
import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'good',
  priceMultiplier: 10,
  breakChance: -1,
  melee: {
    damageType: ['cut', 'imp'],
    dmgMod: 1,
  },
  ranged: {
    range: { maxRange: 1.2, halfRange: 1.2 },
  },
  resolver: (item: Item): Partial<modificationSettings> => {
    if (item instanceof Weapon) {
      const skill = item.managers.meleeManager?.getSkill();
      if (
        [
          'broadsword',
          'rapier',
          'saber',
          'shortsword',
          'smallsword',
          'twoHandedSword',
          'bow',
          'crossbow',
        ].some(s => s === skill)
      ) {
        return { priceMultiplier: 4 };
      }
    }
    return {};
  },
};

export const Good = modificationFabric(settings);
