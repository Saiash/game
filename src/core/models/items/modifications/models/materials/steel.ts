import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'steel',
  type: 'metal',
  priceMultiplier: 0,
};

export const Steel = modificationFabric(settings);
