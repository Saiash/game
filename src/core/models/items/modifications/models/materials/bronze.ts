import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 0,
  code: 'bronze',
  type: 'metal',
  breakChance: 2,
  priceMultiplier: 0,
};

export const Bronze = modificationFabric(settings);
