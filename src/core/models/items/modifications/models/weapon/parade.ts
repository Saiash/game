import { Item } from '../../../item';
import { Weapon } from '../../../weapon';
import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'parade',
  priceMultiplier: 20,
};

export const Parade = modificationFabric(settings);
