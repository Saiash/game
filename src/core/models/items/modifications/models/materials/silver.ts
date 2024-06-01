import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 2,
  code: 'silver',
  type: 'metal',
  breakChance: 2,
  priceMultiplier: 20,
};

export const Silver = modificationFabric(settings);
