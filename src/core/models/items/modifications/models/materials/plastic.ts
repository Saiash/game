import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'plastic',
  type: 'composite',
  priceMultiplier: 2,
  weight: 0.5,
};

export const Plastic = modificationFabric(settings);
