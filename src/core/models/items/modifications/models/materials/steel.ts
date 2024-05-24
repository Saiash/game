import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'steel',
  priceMultiplier: 0,
};

export const Steel = modificationFabric(settings);
