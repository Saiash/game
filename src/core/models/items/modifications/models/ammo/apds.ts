import { modificationFabric, modificationSettings } from '../../fabric';

const settings: modificationSettings = {
  code: 'apds',
  priceMultiplier: 4,
  ranged: {
    armorDelimiter: 2,
    dmgMod: 1,
    options: ['descreasePiType'],
  },
};

export const Apds = modificationFabric(settings);
