import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'iron',
  type: 'metal',
  breakChance: 1,
  priceMultiplier: 0,
};

export const Iron = modificationFabric(settings);
