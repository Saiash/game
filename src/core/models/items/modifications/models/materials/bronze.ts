import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'bronze',
  breakChance: 2,
  priceMultiplier: 0,
};

export const Bronze = modificationFabric(settings);
