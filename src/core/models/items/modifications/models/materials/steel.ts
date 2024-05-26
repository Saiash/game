import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'steel',
  priceMultiplier: 0,
};

export const Steel = modificationFabric(settings);
