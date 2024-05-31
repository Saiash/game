import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'aphc',
  priceMultiplier: 1,
  ranged: {
    armorDelimiter: 2,
    options: ['decreasePiType'],
  },
};

export const Aphc = modificationFabric(settings);
