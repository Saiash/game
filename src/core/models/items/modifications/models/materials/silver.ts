import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'silver',
  breakChance: 2,
  priceMultiplier: 20,
};

export const Silver = modificationFabric(settings);
