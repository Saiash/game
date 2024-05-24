import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'obsidian',
  breakChance: 2,
  priceMultiplier: 4,
  melee: {
    damageType: ['cut', 'imp'],
    dmgMod: 1,
  },
};

export const Obsidian = modificationFabric(settings);

//TODO теряет бонус после атаки цели с СП 2+
