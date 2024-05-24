import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'plastic',
  priceMultiplier: 2,
  weight: 0.5,
};

export const Plastic = modificationFabric(settings);
