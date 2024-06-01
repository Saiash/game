import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'silver',
  type: 'metal',
  breakChance: 2,
  priceMultiplier: 20,
};

export const Silver = modificationFabric(settings);
