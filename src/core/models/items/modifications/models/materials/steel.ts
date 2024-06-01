import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 3,
  code: 'steel',
  type: 'metal',
  priceMultiplier: 0,
};

export const Steel = modificationFabric(settings);
