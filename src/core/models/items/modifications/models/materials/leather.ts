import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 0,
  code: 'leather',
  type: 'leather',
  priceMultiplier: 0,
};

export const Leather = modificationFabric(settings);
