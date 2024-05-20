import { Item } from '../../../item';
import { Weapon } from '../../../weapon';
import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'great',
  priceMultiplier: 20,
  breakChance: -2,
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
        ].some(s => s === skill)
      ) {
        return {
          melee: {
            damageType: ['cut', 'imp'],
            dmgMod: 2,
          },
        };
      }
    }
    return {};
  },
};

export const Great = modificationFabric(settings);
