import { Item } from '../../../item';
import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'rangedGood',
  priceMultiplier: 2,
  malfunction: 1,
  ranged: {
    aim: 1,
  },
};

export const Good = modificationFabric(settings);
