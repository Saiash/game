import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'silver',
  breakChance: 2,
  priceMultiplier: 20,
};

export const Silver = modificationFabric(settings);
