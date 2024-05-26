import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'bronze',
  breakChance: 2,
  priceMultiplier: 0,
};

export const Bronze = modificationFabric(settings);
