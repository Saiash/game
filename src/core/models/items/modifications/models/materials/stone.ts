import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'stone',
  type: 'stone',
  breakChance: 2,
  priceMultiplier: -0.3,
  melee: {
    damageType: ['cut', 'imp'],
    armorDelimiter: 0.5,
  },
};

export const Stone = modificationFabric(settings);
