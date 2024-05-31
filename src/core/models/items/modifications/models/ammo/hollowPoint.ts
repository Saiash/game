import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'hollowPoint',
  priceMultiplier: 0,
  ranged: {
    armorDelimiter: 0.5,
    options: ['improvePiType'],
  },
};

export const HollowPoint = modificationFabric(settings);
