import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'iron',
  breakChance: 1,
  priceMultiplier: 0,
};

export const Iron = modificationFabric(settings);
