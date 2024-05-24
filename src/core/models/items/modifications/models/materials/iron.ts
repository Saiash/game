import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'iron',
  breakChance: 1,
  priceMultiplier: 0,
};

export const Iron = modificationFabric(settings);
