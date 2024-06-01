import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  tl: 6,
  code: 'plastic',
  type: 'composite',
  priceMultiplier: 2,
  weight: 0.5,
};

export const Plastic = modificationFabric(settings);
