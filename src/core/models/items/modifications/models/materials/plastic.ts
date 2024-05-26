import { materialSettings, modificationFabric } from '../../fabric';

const settings: materialSettings = {
  code: 'plastic',
  priceMultiplier: 2,
  weight: 0.5,
};

export const Plastic = modificationFabric(settings);
