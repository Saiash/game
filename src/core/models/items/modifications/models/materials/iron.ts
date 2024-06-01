import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 2,
  code: 'iron',
  type: 'metal',
  breakChance: 1,
  priceMultiplier: 0,
};

export const Iron = modificationFabric(settings);
