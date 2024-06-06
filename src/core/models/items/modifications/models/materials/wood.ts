import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 0,
  code: 'wood',
  type: 'wood',
  priceMultiplier: 0,
};

export const Wood = modificationFabric(settings);
