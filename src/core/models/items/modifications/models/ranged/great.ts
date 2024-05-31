import { Item } from '../../../item';
import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'rangedGreat',
  priceMultiplier: 5,
  malfunction: 1,
  ranged: {
    aim: 2,
  },
};

export const Great = modificationFabric(settings);
