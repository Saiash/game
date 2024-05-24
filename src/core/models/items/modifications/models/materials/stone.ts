import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'stone',
  breakChance: 2,
  priceMultiplier: -0.3,
  melee: {
    damageType: ['cut', 'imp'],
    armorDelimiter: 0.5,
  },
};

export const Stone = modificationFabric(settings);
