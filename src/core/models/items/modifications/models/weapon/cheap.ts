import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'cheap',
  priceMultiplier: -0.7,
  breakChance: 2,
  throw: {
    aim: -1,
  },
};

export const Cheap = modificationFabric(settings);
